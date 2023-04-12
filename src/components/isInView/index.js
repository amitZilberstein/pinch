import React, { useRef, useEffect, useContext, useState } from "react";
import useOnScreen from '../../hooks/useOnScreen';
import { ContextLoader } from '../../context';

const IsInView = ({ children }) => {

	const [isLoading] = useContext(ContextLoader);
	const isOnScreen = useOnScreen(children.ref);
	const [childInView, setChildInView] = useState(false);

	useEffect(() => {
		if (isOnScreen === true && isLoading === false) {
			const newChildInView = React.cloneElement(children, { className: children.props.className + ' is-inview'});
			setChildInView(newChildInView);
		}
	}, [isOnScreen, isLoading])

	return <> {children} </>
}

export default IsInView;