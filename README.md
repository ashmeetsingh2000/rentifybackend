**Introduction**
This is the backend server for our Rentify project. It is built using Node.js and Express, providing a robust and scalable API for the frontend application. The server manages user authentication, data processing, and interactions with the database.

**Features**
User authentication
CRUD operations for various resources
Integration with a database (e.g., MongoDB, PostgreSQL)

**Installation**
Clone the repository: git clone https://github.com/ashmeetsingh2000/rentifybackend.git

cd rentifybackend

Install dependencies: npm install

**Configuration**
Environment Variables:
Create a .env file in the root directory and configure the following variables:

DB_URI= your_database_url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER= your_smtp_user
SMTP_PASS=  your_smtp_pass

Ensure your database is running and accessible using the DB_URI provided in the .env file.

**API Endpoints**
================= [ Authentication ] =================
POST /auth/register - Register a new Seller or buyer
POST /auth/login - Login a Seller or buyer

==================== [ Property ] ====================
GET /property/propertylist - Get all property
GET /property/detail/:id - Get a property by ID
PUT /property/:id - Update a property by ID
GET /property/:id -  Get all property of a Seller
POST /property/addproperty - Create a new property of a seller
DELETE /property/delete/:id - Delete a property by ID

============== [ Like Dislike Feature ] ==============
POST /aubuyeractionth/like - Like a Seller property
POST /buyeraction/unlike - Dislike a Seller property

================== [ Email Feature ] =================
POST /nodemailer/email - Send user email

**Deployment Link**
Server Deployed Link : https://rentifybackend-dusky.vercel.app/