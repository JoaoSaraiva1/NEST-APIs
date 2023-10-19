import psycopg2
import requests
import json
from datetime import date
from concurrent.futures import ThreadPoolExecutor
import time

# Replace these with your actual database connection details
db_params = {
    "dbname": "postgres",
    "user": "postgres",
    "password": "postgres",
    "host": "127.0.0.1",  # Replace with your DB host if necessary
    "port": "5432"   # Replace with your DB port if necessary
}

# Define a function to fetch buff_ids from the database and update price history
# Adjust the number of threads according to your system's capabilities
NUM_THREADS = 6

# Define a function to fetch and update price history for a single buff_id
def fetch_and_update_price(buff_id, conn, max_retries=5):
    retries = 0
    while retries < max_retries:
        try:
            url = f'https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id={buff_id}'
            res = requests.get(url)
            res.raise_for_status()

            data = res.json()
            if 'items' in data['data']:
                items = data['data']['items']

                if items:
                    price = items[0]['price']
                    today = date.today()

                    # Collect data for batch insert
                    batch_data.append((buff_id, price, today))
                    print(f"Price for goods ID {buff_id}: {price} added to batch.")
                    return  # Success, exit the function
                else:
                    print(f"No items found for goods ID {buff_id}.")
            else:
                print(f"No 'items' key found in the response for goods ID {buff_id}.")
        except (requests.exceptions.RequestException, json.JSONDecodeError) as e:
            print(f"Error fetching data for goods ID {buff_id}: {e}")

        # Increment retries and apply exponential backoff
        retries += 1
        wait_time = 2 ** retries  # Exponential backoff: 2^retries seconds
        time.sleep(wait_time)

    print(f"Max retries reached for goods ID {buff_id}")

# Define the batch_insert_to_db function
def batch_insert_to_db(conn, data):
    try:
        cur = conn.cursor()
        cur.executemany("INSERT INTO price_history (buff_id, price, date) VALUES (%s, %s, %s)", data)
        conn.commit()
        print(f"Batch of {len(data)} records inserted into the database.")
    except Exception as e:
        print("Error inserting into the database:", e)
        conn.rollback()

if __name__ == "__main__":
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        cur.execute("SELECT buff_id FROM items")
        buff_ids = [row[0] for row in cur.fetchall()]

        # Initialize data for batch insert
        batch_data = []

        with ThreadPoolExecutor(max_workers=NUM_THREADS) as executor:
            for buff_id in buff_ids:
                executor.submit(fetch_and_update_price, buff_id, conn)

        # Perform batch inserts into the database
        batch_insert_to_db(conn, batch_data)

        cur.close()
    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
