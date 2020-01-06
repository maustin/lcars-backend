const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('./register');
const usersTable = require('../models/users/model');

// POST Register
const register = (req, res) => {
	const { errors, notValid } = validate(req.body);

	if (notValid) {
		return res.status(400).json({ status: 400, errors });
	}

	usersTable.readOne(req.body.email, (err, foundUser) => {
		if (err) {
			console.error('Register User check email exists error:', err);
			return res.status(500).json({
				status: 500,
				message: 'Something went wrong. Please try again.'
			});
		}

		if (foundUser) {
			return res.status(400).json({
				status: 400,
				message: 'Email address has already been registered.'
			});
		}

		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				console.error('bcrypt genSalt error:', err);
				return res.status(500).json({
					status: 500,
					message: 'Something went wrong. Please try again.'
				})
			}

			bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) {
					console.error('bcrypt hash error:', err);
					return res.status(500).json({
						status: 500,
						message: 'Something went wrong. Please try again.'
					})
				}

				let newUser = {
					username: req.body.username,
					email: req.body.email,
					password: hash
				};

				usersTable.create(newUser, (err, data) => {
					if (err)
						return res.status(500).json({ status: 500, message: err });

					res.status(201).json({ status: 201, message: 'success' });
				});
			});
		})
	});
}

const login = (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({ status: 400, message: 'Please email email and password.' });
	}

	usersTable.readOne(req.body.email, (err, foundUser) => {
		if (err) {
			console.error('Login failed reading user by email:', err);
			return res.status(500).json({
				status: 500,
				message: 'Something went wrong. Please try again.'
			});
		}

		if (!foundUser) {
			return res.status(400).json({
				status: 400,
				message: 'Username or password is incorrect.'
			});
		}

		bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
			if (err) {
				console.error('bcrypt compare error:', err);
				return res.status(500).json({
					status: 500,
					message: 'Something went wrong. Please try again.'
				});
			}

			if (!isMatch) {
				return res.status(400).json({
					status: 400,
					message: 'Username or password is incorrect.'
				});
			}
			else {
				// set last login timestamp
				usersTable.setLastLogin(foundUser.id, (err, data) => {
					// don't terribly care
					if (err)
						console.err('User setLastLogin error:', err);
				});

				let user = {
					id: foundUser.id
				};

				jwt.sign(
					user, // payload
					'bubbles', // secret
					{
						expiresIn: '1hr'
					},
					(err, signedJwt) => {
						// TODO: shouldn't we be checking the for err here?
						return res.status(200).json({
							status: 200,
							message: 'success',
							id: foundUser.id,
							signedJwt
						});
					});
			}
		})
	});
}

module.exports = { register, login };