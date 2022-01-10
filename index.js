import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import articleRouter from './routes/articles.js';

const app = express();

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('MongoDB connected successfully!'))
	.catch((error) => console.log(error.message));

app.set('view engine', 'ejs');
app.use(express.json()); // used to parse JSON bodies
app.use(express.urlencoded({ limit: '30mb', extended: true })); // parse URL-encoded bodies
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cors());

app.get('/', async (req, res) => {
	res.render('index');
});

// Routes middleware
app.use('/blog', articleRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server running successfully on port ${PORT}.`)
);
