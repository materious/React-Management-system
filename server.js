const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const app = express();
const logger = winston.createLogger();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');
const data = fs.readFileSync('./database.json');

const conf = JSON.parse(data);
const pg = require('pg');

const client = new pg.Client(conf);

client.connect();
app.get('/api/customers', (req, res) => {	
//	logger.info('winston log');
	const query = 'SELECT * FROM CUSTOMER';

	client.query(query, (err, result) => {
		//console.log(result.rows)
		res.send(result.rows)
	})
	
	/*
	res.send(
		[{
			'id': 1,
			'image': 'https://placeimg.com/64/64/1',
			'name': '홍길동',
			'birthday': '961222',
			'gender': '남자',
			'job': '대학생'
		}]);
	*/

});

app.listen(port, () => console.log(`Listening on port ${port}`));
