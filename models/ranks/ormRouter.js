let express = require('express');
let model = require('./ormModel');

let router = express.Router();

router.get('/', (request, response, next) => {
	model.readAll((error, data) => {
		if (error) next(error);
		else response.json(data);
	});
});

router.get('/:id', (request, response, next) => {
	model.readOne(request.params.id, (error, data) => {
		if (error) next(error);
		else response.json(data);
	});
});

// delete
router.delete('/:id', (request, response, next) => {
	model.remove(request.params.id, (error, data) => {
		if (error) next(error);
		else response.sendStatus(200);
	});
});

module.exports = router;