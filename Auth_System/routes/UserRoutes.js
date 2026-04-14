import *as UserController from '../controllers/UserController.js';
import express from 'express';
// import authHandler from '../middleware/authHandler.js';

const userRoutes = express.Router();

// userRoutes.use(authHandler);
userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);

export default userRoutes;