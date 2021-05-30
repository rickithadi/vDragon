import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
function allKeys() {
    return [
        {id: 1, name: "Finish writing a blogpost"},
        {id: 2, name: "Make chickpea curry for dinner"},
        {id: 3, name: "Wake up at 5:30am"},
    ];
}
app.get('/', (req, res) => {
  return res.send('up and running');
});
app.get('/keys', (req, res) => {
  return res.send(allKeys());
});


app.post('/object', (req, res) => {
	console.log('saving',req.body)
	//create timestamp
	//check if key exists
	//save object or append to existing, with timestamp
	//return said object
  return res.send('Received a POST HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});


app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`));
