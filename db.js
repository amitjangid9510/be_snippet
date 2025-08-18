const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongodb connected');
    } catch (error) {
        console.log("Mongodb connection error:", error.message);
        process.exit(1)
    }
}

module.exports = connectDB;



// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({ 
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0, 
// });

// const db = pool.promise();

// const testConnection = async () => {
//   try {
//     await db.query('SELECT 1');
//     console.log('Database connected successfully');
//   } catch (err) {
//     console.error('Error connecting to the database:', err.message);
//   }
// };

// module.exports =testConnection;
