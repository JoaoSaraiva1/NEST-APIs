import psycopg2
import matplotlib.pyplot as plt
from datetime import datetime

# Replace these with your actual database connection details
db_params = {
    "dbname": "postgres",
    "user": "postgres",
    "password": "postgres",
    "host": "127.0.0.1",  # Replace with your DB host if necessary
    "port": "5432"  # Replace with your DB port if necessary
}

# Specify the item IDs (buff_ids) you want to include in the plots
selected_buff_ids = ["928047", "928111", "928387", "927990", "928045", "928026", "928209", "928049", "928188", "928078", "928078", "928375", "928083", "923019", "928297", "927981", "928030", "928030", "928029"]


try:
    conn = psycopg2.connect(**db_params)
    cur = conn.cursor()

    # Fetch data from the database
    cur.execute("SELECT item_name, price, date FROM items JOIN price_history ON items.buff_id = price_history.buff_id WHERE items.buff_id IN %s", (tuple(selected_buff_ids),))
    data = cur.fetchall()

    if not data:
        print("No data found in the database.")
    else:
        # Prepare data for plotting
        item_names = []
        prices = []
        dates = []

        for row in data:
            item_names.append(row[0])
            prices.append(float(row[1]))
            dates.append(row[2])

        # Create a separate time series chart for each item
        unique_item_names = set(item_names)

        for item_name in unique_item_names:
            plt.figure(figsize=(12, 6))
            plt.title(f"Price Over Time for {item_name}")
            plt.xlabel("Date")
            plt.ylabel("Price")
            
            for i in range(len(item_names)):
                if item_names[i] == item_name:
                    plt.plot(dates[i], prices[i], label=item_name, marker='o')

            plt.legend()
            plt.grid(True)

            plt.show()

    cur.close()
    conn.close()
except psycopg2.Error as e:
    print("Error connecting to the database:", e)
