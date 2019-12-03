let express = require('express');
let model = require('./ormModel');

let router = express.Router();

router.get('/', (request, response, next) => {
	model.readAll((error, data) => {
		if (error)
			next(error);
		else
			response.json(data);
	});
});

router.get('/:id', (request, response, next) => {
	model.readOne(request.params.id, (error, data) => {
		if (error)
			next(error);
		else if (data)
			response.json(data);
		else
			response.status(404).send(`characters id ${request.params.id} not found`);
	});
});

// delete
router.delete('/:id', (request, response, next) => {
	model.remove(request.params.id, (error, data) => {
		if (error)
			next(error);
		else if (data)
			response.sendStatus(200);
		else
			response.status(404).send(`characters id ${request.params.id} not found`);
	});
});

// create
router.post('/', (request, response, next) => {
	model.create(request.body, (error, data) => {
		if (error)
			next(error);
		else
			response.sendStatus(200);
	});
});

// update
router.put('/', (request, response, next) => {
	model.update(request.body, (error, data) => {
		if (error)
			next(error);
		else if (data == 0)
			response.sendStatus(200);
		else
			response.status(404).send(`characters id ${request.body.id} not found`);
	});
});

module.exports = router;