import React from "react";
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../../utils/linkResolver';
import SplitText from '../splitText';
import './styles.scss';

const IntroText = ({ text }) => {
	return (
		<div className="IntroText" data-is-inview>
			<SplitText splitBy="lines">
				<RichText render={text} serializeHyperlink={linkResolver} />
			</SplitText>
		</div>
	)
}

export default IntroText;