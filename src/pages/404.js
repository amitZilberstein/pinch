import React from "react"
import Button from '../components/button';
import { Link } from 'gatsby';
import '../styles/pages/404.scss'

const NotFoundPage = () => (
	<section className="NotFound">
		<video className="NotFound__Video" src="/404.mp4" muted loop autoPlay></video>
		<div className="NotFound__Bottom">
			<p className="NotFound__Text">404 / error - page could not be found</p>
			<Link to="/" className="NotFound__Button">
				<Button text="Travel home" style="colored" type="secondary" hasArrow />
			</Link>
		</div>
	</section>
)

export default NotFoundPage
