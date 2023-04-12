import React, { useEffect } from "react"
import { Helmet } from "react-helmet"

const SEO = ({ title = 'Pinch', bodyClass }) => {

	useEffect(() => {
		document.body.classList.add(bodyClass);
		return () => {
			document.body.classList.remove(bodyClass);
		}
	})

  return (
    <Helmet title={title}>

    </Helmet>
  )
}

export default SEO;
