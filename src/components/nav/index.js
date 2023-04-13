import React, { useState } from "react"
import { Link, navigate } from "gatsby";
import Button from '../button';
import NavLink from "../navLink";
import smoothScrollTo from '../../helpers/smoothScrollTo';
import './styles.scss'

const Nav = ({ isVisible }) => {

	const [isBurgerOpen, setIsBurgerOpen] = useState(false);

	const toggleBurger = () => {
		setIsBurgerOpen(!isBurgerOpen);
	}

	const handleButtonClick = () => {
		const target = document.querySelector('.GetPinchTarget');
		if (target === null) {
			navigate('/')
			const handleNextPageLoaded = () => {
				window.removeEventListener('nextPageLoadedEvent', handleNextPageLoaded);
				setTimeout(() => {
					handleButtonClick();
				}, 3000)
			}
			window.addEventListener('nextPageLoadedEvent', handleNextPageLoaded)
		} else {
			smoothScrollTo(target);
		}
	}

	return (
		<section className={`Nav ${isVisible ? 'is-visible' : ''}`}>
			<Link to="/" className="Nav__Logo" onClick={() => { if (isBurgerOpen === true) toggleBurger() }}>
				<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 150 37"><image width="150" height="37" xlinkHref="data:img/png;base64,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"/></svg>
			</Link>
			<div className="Nav__Right">
				<ul className="Nav__Links">
					<li className="Nav__Link is-featured-link">
						<NavLink to="/featured-creators" text="Featured Creators" />
					</li>
					<li className="Nav__Link is-for-creators-link">
						<NavLink to="/for-creators" text="For Creators" />
					</li>
					<li className="Nav__Link is-faq-link">
						<NavLink to="/faq" text="Faq" />
					</li>
					<li className="Nav__Link is-blog-link">
						<NavLink to="/blog" text="Blog" />
					</li>
				</ul>
				<Button className="Nav__Button--Colored" text="Get Pinch" onClick={handleButtonClick} />
				<Button className="Nav__Button--Grey" text="Get Pinch" onClick={handleButtonClick} style="grey" />
			</div>
			<div className={`Nav__Burger ${isBurgerOpen ? 'is-open' : ''}`}>
				<span className="Nav__BurgerClose" onClick={toggleBurger}>Close</span>
				<div className="Nav__BurgerToggle Nav__BurgerToggle--Open" onClick={toggleBurger}></div>
				<div className="Nav__BurgerToggle Nav__BurgerToggle--Close" onClick={toggleBurger}></div>
				<div className="Nav__BurgerContainer">
					<div className="Nav__BurgerLinks">
						<a href="https://rewards.pinchbank.com" onClick={toggleBurger}>Rewards</a>
						<Link to="/featured-creators" className="is-featured-link" activeClassName="active" onClick={toggleBurger}>
							Featured Creators
						</Link>
						<Link to="/for-creators" className="is-for-creators-link" activeClassName="active" onClick={toggleBurger}>
							For Creators
						</Link>
						<Link to="/faq" className="is-faq-link" activeClassName="active" onClick={toggleBurger}>
							FAQ
						</Link>
						<Link to="/blog" className="is-blog-link" activeClassName="active" onClick={toggleBurger}>
							Blog
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Nav
