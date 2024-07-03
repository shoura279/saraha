import Router from 'express';
import { addMessage, getMessage } from './message.controller';

const messageRouter = Router();

messageRouter.post('/message/:receiverId', addMessage);
messageRouter.get('/message/:receiverId', getMessage);