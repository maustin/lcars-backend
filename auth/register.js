module.exports = ({ username, email, password, password2 }) => {
	let errors = [];
	if (!username)
		errors.push({ message: 'Please enter a user name.' });

	if (!email)
		errors.push({ message: 'Please enter a valid email.' });

	if (!password)
		errors.push({ message: 'Please enter a password.' });

	if (password != password2)
		errors.push({ message: 'Passwords do not match.' });

	return {
		errors,
		notValid: Boolean(errors.length)
	};
};