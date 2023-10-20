1- Database Setup:
- Create a PostgreSQL database for your project.
- Define the tables you'll need to store item information and purchase history. Create a schema for your tables.

2- Backend with Nest.js:
- Set up database connections. You can use libraries like TypeORM to interact with PostgreSQL.
- Create controllers and services to handle item management and purchase history.
- Implement API endpoints to create, read, update, and delete items.
- Secure your API by implementing basic authentication or API key verification, even if it's just for personal use.
- Frontend with Next.js:

3- Frontend with Next.js:
- Design the user interface for your platform using HTML, CSS, and React components.
- Implement pages for item management and viewing purchase history.
- Use Axios or another HTTP client to make API requests to your Nest.js backend.

4-Python Price Scraper:
- Modify the Python script to scrape item prices based on their IDs.
- Create a Cron Job to fetch item prices everyday.
4.1- Try evaluate if there is a significant change between get the prices at diferent times during the day

