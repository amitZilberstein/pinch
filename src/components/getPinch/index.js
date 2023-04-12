import React, { useState } from 'react';
import Button from '../button';
import VideoResponsive from '../videoResponsive';
import registerEmail from '../../helpers/registerEmail';
import './styles.scss';

const GetPinch = ({ data }) => {

	// Download part video
	const [showLoopVideo, updateShowLoopVideo] = useState(false);
	const [showEnterVideo, updateShowEnterVideo] = useState(true);

	const handleBackgroundEnterVideoEnded = () => {
		updateShowLoopVideo(true);
		requestAnimationFrame(() => {
			updateShowEnterVideo(false);
		})
	}

	// Subscribe part email register
	const [email, updateEmail] = useState('');
	const [isSent, updateIsSent] = useState(null);

	const handleSubmit = () => {
		registerEmail(email, 'get-pinch')
			.then(res => {
				if (res.status && res.status === 200) {
					window.dataLayer.push({
						event: 'submit-to-waitlist'
					});
					updateIsSent(true);
				} else {
					updateIsSent(false);
				}
			})
	}

	return (
		<>
			{data.is_subscribe_visible &&
				<div className="GetPinchSubscribe GetPinchTarget" data-is-inview>
					{/* <div className="Presentation__Dots" data-is-inview>
						<SplitText splitBy="chars" noDelay>
							<RollingChars>
								<span className="Presentation__DotsLine">Join waitlist</span>
								<span className="Presentation__DotsLine">- 08 / 08</span>
							</RollingChars>
						</SplitText>
					</div> */}
					<h4 className="GetPinchSubscribe__Title">
						<span>{data.subscribe_title[0].text}</span>
					</h4>
					<p className={`GetPinchSubscribe__Join ${isSent !== null ? 'show-response' : ''}`}>
						<span className="GetPinchSubscribe__JoinInitial">{data.subscribe_subtitle[0].text}</span>
						<span className="GetPinchSubscribe__JoinResponse">
							{isSent === true && <span className="success">Email succesfully registered</span>}
							{isSent === false && <span className="error">There was a problem. Please verify your email or try again later.</span>}
						</span>
					</p>
					<div className="GetPinchSubscribe__Input">
						<div className="GetPinchSubscribe__InputContainer">
							<input
								type="email"
								value={email}
								onChange={e => updateEmail(e.target.value)}
								placeholder={data.subscribe_email_placeholder[0].text}
							/>
						</div>
					</div>
					<Button text={data.subscribe_button_text[0].text} type="secondary" hasArrow onClick={handleSubmit} />
				</div>
			}
			{data.is_download_visible &&
				<div className="GetPinchDownload GetPinchTarget" data-is-inview data-section-name="download" data-parallax="0.1">
					<div className="GetPinchDownload__Background" data-is-inview data-parallax="-0.1">
						<div className={`enter-video ${!showEnterVideo ? 'hidden' : ''}`}>
							<VideoResponsive
								srcDesktop={data.download_background_enter_video.url}
								srcMobile={null}
								loop={false}
								onEnded={handleBackgroundEnterVideoEnded}
							/>
						</div>
						<div className={`loop-video ${showLoopVideo ? 'visible' : ''}`}>
							<VideoResponsive
								srcDesktop={data.download_background_loop_video.url}
								srcMobile={null}
							/>
						</div>
						<img
							srcSet={data.download_background_image_mobileSharp.childImageSharp.fluid.srcSet}
							className="mobile"
						/>
					</div>
					<div className="GetPinchDownload__Container">
						<h3 className="GetPinchDownload__Title" data-is-inview >
							<span>{data.download_title[0].text}</span>
						</h3>
						<div className="GetPinchDownload__Buttons" data-is-inview>
							<a href={data.download_app_store_link.url} target="_blank" className="GetPinchDownload__Button">
								<svg viewBox="0 0 256 315" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path fill="#464646" d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615-.35 1.116-6.599 22.563-21.757 44.716-13.104 19.153-26.705 38.235-48.13 38.63-21.05.388-27.82-12.483-51.888-12.483-24.061 0-31.582 12.088-51.51 12.871-20.68.783-36.428-20.71-49.64-39.793-27-39.033-47.633-110.3-19.928-158.406 13.763-23.89 38.36-39.017 65.056-39.405 20.307-.387 39.475 13.662 51.889 13.662 12.406 0 35.699-16.895 60.186-14.414 10.25.427 39.026 4.14 57.503 31.186-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199-15.826.636-34.962 10.546-46.314 23.828-10.173 11.763-19.082 30.589-16.678 48.633 17.64 1.365 35.66-8.964 46.64-22.262"/></svg>
								<span>Download on the App Store</span>
							</a>
							<a href={data.download_google_play_link.url} target="_blank" className="GetPinchDownload__Button">
								<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path fill="#464646" d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941a1.563 1.563 0 01-1.532-.011l-.192-.13zm9.469-11.56L1 22.115V2.093l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zM1.46.433A1.563 1.563 0 013.295.195L15.948 7.21l-3.846 3.835L1.46.433z"/></svg>
								<span>Download on Google Play</span>
							</a>
						</div>
					</div>
				</div>
			}
		</>
	)
}

export default GetPinch;