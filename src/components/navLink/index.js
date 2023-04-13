import React, { useState } from "react";
import { Link } from "gatsby";
import SplitText from '../splitText';
import RollingChars from '../rollingChars';
import './styles.scss';

const NavLink = ({ to = '', text = '' }) => {

	const [isMouseOver, updateIsMouseOver] = useState(false);

	const handleMouseEnter = () => updateIsMouseOver(true);
	const handleMouseLeave = () => updateIsMouseOver(false);

	if (to === "rewards") {
		return (
			<div
				className="NavLink"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
				<a href="https://rewards.pinchbank.com">{text}</a>
				<SplitText splitBy="chars" noDelay>
					<RollingChars isMouseOver={isMouseOver}>{text}</RollingChars>
				</SplitText>
			</div>
		)
	}

	return (
		<div
			className="NavLink"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<Link to={to}>{text}</Link>
			<SplitText splitBy="chars" noDelay>
				<RollingChars isMouseOver={isMouseOver}>{text}</RollingChars>
			</SplitText>
		</div>
	)
}

export default NavLink;