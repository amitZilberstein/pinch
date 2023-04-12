import React from "react"
import { Link } from 'gatsby';
import './styles.scss'
import SplitText from '../splitText';

/*
* style :
* 'colored' -> border have the gradient
* 'grey' -> border are grey
*
* type :
* primary -> no arrow and title font
* secondary -> arrow and body font
*/

const ArticleCard = ({ data, type = 'full' }) => {

	const publicationDate = new Date(data._meta.firstPublicationDate.slice(0, 10));
	const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' });
	const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(publicationDate);
	const formatedDate = `${month} ${day} ${year}`;

	return (
		<Link className={`ArticleCard ${type} `} to={`/${data._meta.uid}`}>
			<div className="ArticleCard__Image">
				<img srcSet={data.main_imageSharp.childImageSharp.fluid.srcSet} />
			</div>
			<div className="ArticleCard__Infos">
				<div className="ArticleCard__Date">
					<span> {formatedDate} / {data.minutes_to_read} min read </span>
				</div>
				<h3 className="ArticleCard__Title">
					<span to={`/${data._meta.uid}`}>
						<SplitText>
							{data.title[0].text}
						</SplitText>
					</span>
				</h3>
				<div className="ArticleCard__Tags">
					{data._meta.tags.map((tag, index) => {
						if (index > 2) return;
						return <Link to={`/${tag}`} key={`tag-${index}`} className="link">{tag}</Link>
					})}
				</div>
				<span to={`/${data._meta.uid}`} className="ArticleCard__Link">
					<span>Read article</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 13.2"><path d="M2.4 1.2v1.4l11.1 8.2h1l11.1-8.2V1.2c0-.7.5-1.2 1.2-1.2S28 .5 28 1.2v1.3c0 1-.2 1.3-.7 1.7l-11.5 8.5c-.3.2-.7.4-1.1.4h-1.5c-.4 0-.8-.1-1.1-.4L.7 4.2C.1 3.8 0 3.5 0 2.5V1.2C0 .5.5 0 1.2 0s1.2.5 1.2 1.2z" fill="#fff"/></svg>
				</span>
			</div>
		</Link>
	)
}
export default ArticleCard
