import { Link } from "gatsby"
import React from "react"

export const linkResolver = (type, element, content, children, index) => {

	let link = null;
	switch (element.data.type) {
		case 'homepage':
			link = '/';
			break;
		default:
			link = '/';
	}

	if (element.data.link_type === "Web") {
		return <a href={element.data.url}>{content}</a>
	}
	return (
		<Link key={element.data.id} to={link}>
			{content}
		</Link>
	)
}