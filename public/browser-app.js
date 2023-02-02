// Variables
const formDOM = document.querySelector('.form');
const usernameInputDOM = document.querySelector('.username-input');
const passwordInputDOM = document.querySelector('.password-input');
const formAlertDOM = document.querySelector('.form-alert');
const resultDOM = document.querySelector('.result');
const btnDOM = document.querySelector('#data');
const tokenDOM = document.querySelector('.token');

// Submit form
formDOM.addEventListener('submit', async(e) => {
	e.preventDefault();
	formAlertDOM.classList.remove('text-success');
	tokenDOM.classList.remove('text-success');
	const username = usernameInputDOM.value;
	const password = passwordInputDOM.value;
	try {
		const { data } = await axios.post('/api/v1/login', { username, password });
		formAlertDOM.style.display = 'block';
		formAlertDOM.textContent = data.msg;
		formAlertDOM.classList.add('text-success');
		usernameInputDOM.value = '';
		passwordInputDOM.value = '';
		localStorage.setItem('jwtBasicsToken', data.token);
		resultDOM.innerHTML = '';
		tokenDOM.textContent = 'token present';
		tokenDOM.classList.add('text-success');
	} catch (error){
		formAlertDOM.style.display = 'block';
		formAlertDOM.textContent = error.response.data.msg;
		localStorage.removeItem('jwtBasicsToken');
		resultDOM.innerHTML = '';
		tokenDOM.textContent = 'no token present';
		tokenDOM.classList.remove('text-success');
	}
	setTimeout(() => {
		formAlertDOM.style.display = 'none';
	}, 2000);
});

// Btn click
btnDOM.addEventListener('click', async () => {
	const token = localStorage.getItem('jwtBasicsToken');
	try {
		const { data } = await axios.get('/api/v1/dashboard', {
			headers: { Authorization: `Bearer ${ token }`, },
		});
		resultDOM.innerHTML = `<h5>${ data.msg }</h5><p>${ data.secret }</p>`;
		data.secret;
	} catch (error){
		localStorage.removeItem('jwtBasicsToken');
		resultDOM.innerHTML = `<p>${ error.response.data.msg }</p>`;
	}
});

// Check token for display
const checkToken = () => {
	tokenDOM.classList.remove('text-success');
	const token = localStorage.getItem('jwtBasicsToken');
	if (token){
		tokenDOM.textContent = 'token present';
		tokenDOM.classList.add('text-success');
  	}
};
checkToken();