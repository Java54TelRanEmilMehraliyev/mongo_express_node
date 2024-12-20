import express from 'express';
import dotenv from 'dotenv';
import CommentsController from './actionController/commentsController.mjs';
import MflixService from './service/MflixService.mjs';
import { errorHandler } from './errorHandlers/errorHandler.mjs';
import AccountsRouter from './routes/accountsRoutes.mjs';
import MongoConnection from './mongo/MongoConnection.mjs';
import AccountsService from './service/accountsService.mjs';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3500;

const mongoConnection = new MongoConnection(process.env.MONGO_URI,process.env.DB_NAME);
const accountsService = new AccountsService(mongoConnection)

const mflixService = new MflixService(
  process.env.MONGO_URI,
  process.env.DB_NAME,
  process.env.MOVIES_COLLECTION,
  process.env.COMMENTS_COLLECTION
);

const commentsController = new CommentsController(mflixService);

app.use(express.json());
app.use("/sample_mflix/comments", commentsController.router);
app.use("/accounts",AccountsRouter(accountsService));

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});


