require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const { connectDB } = require('./src/config/db');
const errorHandler = require('./src/utils/errorHandler');

// Routes
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(helmet());
app.use(cookieParser());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/v1/admin', adminRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint [${req.method}] ${req.originalUrl} not found`,
  });
});

// Global Error Handler 
app.use(errorHandler);

// Start Server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

// npm install jsonwebtoken crypto mongoose bcrypt validator dotenv cors helmet cookie-parser path express multer


//--------------# Windows ---------------
// mkdir src
// mkdir src\routes
// mkdir src\middlewares
// mkdir src\utils
// mkdir src\db
// mkdir src\controllers
// mkdir src\models
// New-Item -Path src\middlewares\multer.js -ItemType File
// New-Item -Path src\utils\errorHandler.js -ItemType File
// New-Item -Path src\middlewares\authMiddleware.js -ItemType File
// New-Item -Path src\routes\authRoutes.js -ItemType File
// New-Item -Path src\models\User.model.js -ItemType File
// New-Item -Path src\controllers\UserAuth.controller.js -ItemType File
// New-Item -Path src\db\db.js -ItemType File


//--------------# linux ---------------

// mkdir -p src/routes src/middlewares src/utils src/db src/controllers src/models

// touch src/middlewares/multer.js
// touch src/utils/errorHandler.js
// touch src/middlewares/authMiddleware.js
// touch src/routes/authRoutes.js
// touch src/models/User.model.js
// touch src/controllers/UserAuth.controller.js
// touch src/db/db.js
