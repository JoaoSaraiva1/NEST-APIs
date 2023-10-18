import requests
res= requests.get('https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id=33895').json()

for price in res['data']['items']:
    print(price['price'])