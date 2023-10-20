import psycopg2

# Replace these with your actual database connection details
db_params = {
    "dbname": "postgres",
    "user": "postgres",
    "password": "joaoename",
    "host": "127.0.0.1",  # Replace with your DB host if necessary
    "port": "5432"   # Replace with your DB port if necessary
}

# Define a function to read and insert data from the file
def insert_items_from_file(file_name, conn):
    try:
        with open(file_name, 'r') as file:
            lines = file.readlines()

            cur = conn.cursor()
            for line in lines:
                # Split the line into ID and name
                buff_id, item_name = line.strip().split(';')

                # Insert the data into the "items" table
                cur.execute("INSERT INTO items (buff_id, item_name) VALUES (%s, %s)", (buff_id, item_name))
            
            conn.commit()
            cur.close()
            print("Records inserted successfully.")

    except Exception as e:
        print("Error:", e)
        conn.rollback()

if __name__ == "__main__":
    try:
        conn = psycopg2.connect(**db_params)
        insert_items_from_file("./paris_2023.txt", conn)
    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
