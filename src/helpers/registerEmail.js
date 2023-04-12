import axios from 'axios';

const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/submit`;
const PORTAL_ID = '8037469';

const registerEmail = async (email, origin) => {
	let formId = null;
	if (origin === 'waitlist-input') {
		formId = process.env.GATSBY_WAITLIST_INPUT_FORMID;
	} else if (origin === 'get-pinch') {
		formId = process.env.GATSBY_GET_PINCH_FORMID;
	}

	let response;
	await axios.post(`${HUBSPOT_API_URL}/${PORTAL_ID}/${formId}`, {
		fields: [
			{ name: 'email', value: email },
			{ name: 'url', value: window.location.href }
		]
  })
  .then(res => {
		response = res;
  })
  .catch(err => {
		response = err;
	});
	return response;
}

export default registerEmail;