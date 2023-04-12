import React, { useState, useEffect } from 'react';

const VideoResponsive = ({
	className,
	srcDesktop,
	srcMobile,
	autoPlay = true,
	loop = true,
	playsInline = true,
	onEnded = null
}) => {

	const [source, setSource] = useState(null);

	useEffect(() => {
		const isTouch = localStorage.getItem('is-touch');
		if (isTouch === null) return;
		if (isTouch === 'true') setSource(srcMobile);
		else setSource(srcDesktop);
	}, [])

	const handleOnEnded = () => {
		if (onEnded) onEnded();
	}

	return (
		<video
			className={`${className}`}
			src={source}
			muted
			autoPlay={autoPlay}
			loop={loop}
			playsInline={playsInline}
			onEnded={handleOnEnded}
		></video>
	)
}

export default VideoResponsive;