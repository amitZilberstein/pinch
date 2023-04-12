import React, { useState } from 'react';
import registerEmail from '../../helpers/registerEmail';
import './styles.scss';

const WaitlistInput = ({ placeholder = 'Join the waitlist' }) => {

	const [email, updateEmail] = useState('');
	const [isSent, updateIsSent] = useState(null);

	const handleSubmit = () => {
		registerEmail(email, 'waitlist-input')
			.then(res => {
				if (res.status && res.status === 200) {
					window.dataLayer.push({
						event: 'submit-to-waitlist'
					});
					updateIsSent(true);
				} else {
					updateIsSent(false);
				}
			})
	}

	return (
		<div className="WaitlistInput__Wrapper">
			<div className="WaitlistInput" data-is-inview>
				<input
					type="email"
					value={email}
					onChange={e => updateEmail(e.target.value)}
					placeholder={placeholder}
				/>
				<div className="WaitlistInput__Submit" onClick={handleSubmit}>
					<svg viewBox="0 0 24 54" xmlns="http://www.w3.org/2000/svg"><path d="M3.124 50.79l18.448-23.726L3.124 3.34" stroke="#FFF" strokeWidth="6" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="bevel"/></svg>
				</div>
			</div>
			<p className="WaitlistInput__Message">
				{isSent === true && <span className="success">Email succesfully registered</span>}
				{isSent === false && <span className="error">There was a problem. Please verify your email or try again later.</span>}
			</p>
		</div>
	)
}

export default WaitlistInput;