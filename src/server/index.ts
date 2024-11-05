import express from 'express';
import { routeAdapter } from './adapters/routeAdapter';
import { makeSignUpController } from './factories/makeSignUpController';
const app = express();

app.use(express.json());

app.post('/sign-in', routeAdapter(makeSignUpController()));

app.listen(3000, () => {
	console.log('🚀 Server is running on port: http://localhost:3000');
});
