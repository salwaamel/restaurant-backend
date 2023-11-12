import express, { Router, Request, Response } from 'express';
import { OwnerController } from '../controller/OwnerController';

export const OwnerRoute: Router = express.Router();

OwnerRoute.get('/', OwnerController.getAllOrder)
OwnerRoute.get('/:id', OwnerController.getOrderById)
OwnerRoute.post('/', OwnerController.createOrder)
OwnerRoute.patch('/', OwnerController.updateOrder)
OwnerRoute.delete('/', OwnerController.deleteOrder)