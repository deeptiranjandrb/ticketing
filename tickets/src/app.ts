import { currentUser, errorHandler, NotFoundError } from '@drbgittix/common';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { indexTicketRouter } from '../src/routes/index';
import { createTicketRouter } from '../src/routes/new';
import { showTicketRouter } from '../src/routes/show';
import { updateTicketRouter } from '../src/routes/update';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all('*',() => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };

