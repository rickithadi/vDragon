import express from 'express';

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

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

app.listen(PORT, function() {
  console.error(
    `Node ${
      isDev ? 'dev server' : 'cluster worker ' + process.pid
    }: listening on port ${PORT}`,
  );
  //console.error(`Node istening on port ${PORT}`);
});
