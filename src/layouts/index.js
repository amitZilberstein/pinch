import React, { useState, useEffect } from "react";
import Nav from '../components/nav';
import Loader from '../components/loader';
import Transition from '../components/transition';
import './styles.scss';
import { ContextLoader, ContextTransition } from '../context';
import '../helpers/noSSR';
import '../helpers/requestInterval';
import detectBrowser from "../utils/detectBrowser";

const Layout = ({ children, location }) => {

	const [isLoading, updateIsLoading] = useState(true);
	const [isTransitioning, updateIsTransitioning] = useState(true);

	useEffect(() => {
		const isSafari = detectBrowser() === 'safari' ? true : false;
		if (isSafari) document.documentElement.classList.add('is-safari');
	});

	return (
		<>
			<ContextLoader.Provider value={[isLoading, updateIsLoading]}>
				<ContextTransition.Provider value={[isTransitioning, updateIsTransitioning]}>
					<div className="App">
						<Loader location={location} />
						<Nav isVisible={!isLoading} />
						<img src="/background-color-witness.png" className="ColorWitnessImage" />
						<div className="ScrollProgress">
							<div className="ScrollProgressBar"></div>
						</div>
						<Transition location={location}>
							<div className="App__TransitionContainer">
								{children}
							</div>
						</Transition>
					</div>
				</ContextTransition.Provider>
			</ContextLoader.Provider>
		</>
	)

}

export default Layout;