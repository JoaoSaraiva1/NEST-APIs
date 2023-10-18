import requests
import json

# Open the file and read the goods IDs
with open('./paris_2023.txt', 'r') as file:
    lines = file.readlines()

goods_ids = [line.split(';')[0] for line in lines]

# Iterate over each goods ID
for goods_id in goods_ids:
    url = f'https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id={goods_id}'
    
    try:
        res = requests.get(url)
        res.raise_for_status()  # Raise an exception for HTTP errors
        
        try:
            data = res.json()
            
            if 'items' in data['data']:
                items = data['data']['items']
                
                if items:
                    print(f"Price for goods ID {goods_id}: {items[0]['price']}")
                else:
                    print(f"No items found for goods ID {goods_id}.")
            else:
                print(f"No 'items' key found in the response for goods ID {goods_id}.")
        except json.JSONDecodeError:
            print(f"Invalid JSON response for goods ID {goods_id}.")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data for goods ID {goods_id}: {e}")
