import React from 'react';
import LogoFooter from '../../images/logo-footer.png';
import { Link } from 'gatsby';
import './styles.scss';

const Footer = ({ commons }) => {

	return (
		<footer className="Footer">
			<div className="Footer__Top">
				<img className="Footer__Logo" src={LogoFooter} alt="Pinch Footer logo" />
				<div className="Footer__Nav">
					<ul>
						<li>
							Company
						</li>
						<li>
							<a href="https://app.paythen.co/company/pinch/plan/6oowxd25qa">Subscribe</a>
						</li>
						<li className="is-featured-link">
							<Link to="/featured-creators">Featured Creators</Link>
						</li>
						<li className="is-for-creators-link">
							<Link to="/for-creators">For Creators</Link>
						</li>
						<li className="is-faq-link">
							<Link to="/faq">FAQ</Link>
						</li>
						<li className="is-blog-link">
							<Link to="/blog">Blog</Link>
						</li>
					</ul>
					<ul>
						<li>
							Support
						</li>
						<li>
							<a href='mailto:hi@pinchbank.com' target="_blank" rel="noopener noreferrer">Contact us</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="Footer__Bottom">
				<span>© pinch. 2020</span>
			</div>
		</footer>
	)
}

export default Footer;
