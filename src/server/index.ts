import express from 'express';
import { makeSignUpController } from '../factories/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';
const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));

app.listen(3000, () => {
	console.log('🚀 Server is running on port: http://localhost:3000');
});
