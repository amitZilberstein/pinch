import React from "react"
import { Link } from "gatsby";
import Button from '../button';
import SplitText from '../splitText';
import './styles.scss'

const ArticleCardLarge = ({ data }) => {

	const publicationDate = new Date(data._meta.firstPublicationDate.slice(0, 10));
	const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' });
	const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(publicationDate);
	const formatedDate = `${month} ${day} ${year}`;

	return (
		<div className="ArticleCardLarge" data-is-inview>
			<div className="ArticleCardLarge__Background">
				<img srcSet={data.main_imageSharp.childImageSharp.fluid.srcSet} />
				<div className="ArticleCardLarge__BackgroundOverlay"></div>
			</div>
			<div className="ArticleCardLarge__Container" data-is-inview>
				<div className="ArticleCardLarge__Date">
					<span> {formatedDate} / {data.minutes_to_read} min read </span>
				</div>
				<h2 className="ArticleCardLarge__Title" data-is-inview>
					<SplitText splitBy="lines">{data.title[0].text}</SplitText>
				</h2>
				<Link to={`/${data._meta.uid}`} className="ArticleCardLarge__Link">
					<Button text="Read article" style="grey" type="secondary" hasArrow />
				</Link>
			</div>
		</div>
	)
}

export default ArticleCardLarge
