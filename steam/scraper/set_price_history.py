import psycopg2
import requests
import json
from datetime import date

# Replace these with your actual database connection details
db_params = {
    "dbname": "postgres",
    "user": "postgres",
    "password": "postgres",
    "host": "127.0.0.1",  # Replace with your DB host if necessary
    "port": "5432"   # Replace with your DB port if necessary
}

# Define a function to fetch buff_ids from the database and update price history
def fetch_and_update_price_history(conn):
    try:
        cur = conn.cursor()
        cur.execute("SELECT buff_id FROM items")
        buff_ids = [row[0] for row in cur.fetchall()]
        
        for buff_id in buff_ids:
            url = f'https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id={buff_id}'
            try:
                res = requests.get(url)
                res.raise_for_status()  # Raise an exception for HTTP errors
                
                try:
                    data = res.json()
                    if 'items' in data['data']:
                        items = data['data']['items']
                        
                        if items:
                            price = items[0]['price']
                            today = date.today()
                            
                            # Insert the data into the "price_history" table
                            cur.execute("INSERT INTO price_history (buff_id, price, date) VALUES (%s, %s, %s)", (buff_id, price, today))
                            print(f"Price for goods ID {buff_id}: {price} added to price history.")
                        else:
                            print(f"No items found for goods ID {buff_id}.")
                    else:
                        print(f"No 'items' key found in the response for goods ID {buff_id}.")
                except json.JSONDecodeError:
                    print(f"Invalid JSON response for goods ID {buff_id}.")
            except requests.exceptions.RequestException as e:
                print(f"Error fetching data for goods ID {buff_id}: {e}")
        
        conn.commit()
        cur.close()
    except Exception as e:
        print("Error:", e)
        conn.rollback()

if __name__ == "__main__":
    try:
        conn = psycopg2.connect(**db_params)
        fetch_and_update_price_history(conn)
    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
