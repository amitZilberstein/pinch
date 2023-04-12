import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import './styles.scss';

class Transition extends React.PureComponent {

	constructor(props) {
		super(props);
		this.transitionLayerEl = React.createRef();
		this.handleExit = this.handleExit.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
	}

	handleExit() {
		this.transitionLayerEl.current.classList.remove('visible');
		this.transitionLayerEl.current.classList.add('leaving');
		document.body.classList.remove('transition-in');
		document.body.classList.add('transition-out');
		setTimeout(() => {
			document.body.classList.remove('links-disabled');
		}, 1000)
		setTimeout(() => {
			document.body.classList.remove('transition-out');
			this.transitionLayerEl.current.classList.remove('leaving');
		}, 4000)
	}

	handleEnter() {
		this.transitionLayerEl.current.classList.remove('leaving');
		this.transitionLayerEl.current.classList.add('visible');
		document.body.classList.add('transition-in');
		document.body.classList.add('links-disabled');
		setTimeout(() => {
			document.querySelectorAll('.App__TransitionContainer')[0].style.display = 'none';
		}, 300);
	}

  render() {
		const { children, location } = this.props

    return (
			<>
				<SwitchTransition mode="in-out">
					<CSSTransition
						key={location.pathname}
						timeout={{
							// enter: 400,
							// exit: 800,
							enter: 1000,
							exit: 600
						 }}
						onExit={this.handleExit}
						onEnter={this.handleEnter}
					>
						{children}
					</CSSTransition>
				</SwitchTransition>
				<div className="TransitionLayer" ref={this.transitionLayerEl}>
					<div className="TransitionLayer__Main"></div>
					<div className="TransitionLayer__Background"></div>
				</div>
			</>
    )
  }
}
export default Transition