import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  return res.send('up and running');
});


app.get('/checkhealth', (req, res) => {
  return res.send('up and running');
});

app.post('/object', (req, res) => {
	console.log(`adding ${JSON.parse(req.body)}`)
	//create timestamp
	//check if key exists
	//save object or append to existing, with timestamp
	//return said object
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});


app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`));
