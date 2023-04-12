import React, {useEffect, useContext, useState} from 'react';
import { adaptBgColorToVideo } from '../../helpers/adaptBgColorToVideo';
import { ContextLoader } from '../../context';
import loadFonts from '../../helpers/loadFonts';

const Loader = ({ location }) => {

	const [isLoading, updateIsLoading] = useContext(ContextLoader);

	// General
	useEffect(() => {
		document.documentElement.classList.add('is-loading');
	}, [])

	// Global loaded promise
	useEffect(() => {
		setTimeout(() => {
			adaptBgColorToVideo();
		}, 500)
		if (location === null || isLoading === false) return;
		// If homepage and desktop, load video first
		// if (location.pathname === '/' && localStorage.getItem('is-touch') === 'false') {
		if (false) {
			const video = document.querySelector('.Homepage__IntroVideo');
			handleVideoLoaded(video).then(() => {
				handleFontsLoaded().then(() => {
					video.play();
					handleVideoEnded(video).then(() => {
						updateIsLoading(false);
						document.documentElement.classList.remove('is-loading');
						document.documentElement.classList.add('is-loaded');
					})
				})
			})
		} else {
			// Else just load fonts
			handleFontsLoaded().then(() => {
				setTimeout(() => {
					updateIsLoading(false);
					document.documentElement.classList.remove('is-loading');
					document.documentElement.classList.add('is-loaded');
				}, 1000)
			})
		}
	}, [])

	// Load video
	const handleVideoLoaded = video => {
		return new Promise(
			(resolve) => {
				let timeoutId = null;
				// If video is already loaded
				if (video.readyState === 4) {
					resolve(video);
				}
				// Add event listener
				video.addEventListener('loadeddata', () => {
					clearTimeout(timeoutId);
					resolve(video);
				});
				// if video is still not loaded after 1s,
				// resolve it anyway to launch the rest of the anim
				timeoutId = setTimeout(() => {
					resolve(video);
				}, 1000)
			},
		);
	}

	// End video
	const handleVideoEnded = video => {
		return new Promise(
			(resolve) => {
				video.addEventListener('ended', () => {
					resolve(video);
				});
			}
		)
	}

	// Load fonts
	const handleFontsLoaded = () => {
		return new Promise(
			(resolve) => {
				loadFonts().then(() => {
					resolve();
				});
			}
		)
	}

	return (
		<div className="Loader"></div>
	)
}

export default Loader;