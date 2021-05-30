import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import ObjectSchema from './model.js'
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// should probably use env variable for this
const dbUrl='mongodb+srv://admin:123@cluster0.amcwc.mongodb.net/keyValue?retryWrites=true&w=majority'
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dbUrl);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', (req, res) => {
  return res.send('up and running');
});
app.get('/keys', (req, res) => {
  return res.send('getting all data');
});


app.post('/object', (req, res) => {
	//create object from schema and insert
let key=	Object.keys(req.body)[0]
	ObjectSchema.create({value:req.body[key],key})
	 //   .then(object => res.json({object}))
	    //.catch(err => res.status(400).json({err}));

	//return said object
  return res.send('Received a POST HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});


app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`));
