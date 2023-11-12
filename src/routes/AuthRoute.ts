import express, { Router } from 'express';
import { AuthController } from '../controller/AuthController';

export const AuthRoute: Router = express.Router();

AuthRoute.post('/', AuthController.handleLogin)
AuthRoute.patch('/', AuthController.handleRegister)
AuthRoute.delete('/', AuthController.handleLogout)