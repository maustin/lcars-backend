let express = require('express');
let model = require('./model');

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
			response.status(404).send(`ships id ${request.params.id} not found`);
	});
});

// delete
router.delete('/:id', (request, response, next) => {
	model.remove(request.params.id, (error, data) => {
		if (error) {
			if (error == 404)
				response.status(404).send(`ships id ${request.params.id} not found`);
			else
				next(error);
		}
		else
			response.sendStatus(200);
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
		if (error) {
			if (error == 404)
				response.status(404).send(`ships id ${request.body.id} not found`);
			else
				next(error);
		}
		else
			response.sendStatus(200);
	});
});

module.exports = router;