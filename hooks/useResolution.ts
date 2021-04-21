import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { UserAgent } from 'next-useragent'
import { RootState } from 'types/redux'

function useResolution(resoultion = 480) {
	const userAgent = useSelector<RootState, UserAgent>(state => state.app.userAgent)

	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			const isMobileDevice = !!navigator.userAgent.match(/Mobile/) || false
			const width = window.innerWidth

			if (width <= resoultion || (isMobileDevice && window.screen.availWidth <= resoultion))
				setIsMobile(true)
			else setIsMobile(false)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [userAgent])

	if (userAgent?.isMobile && resoultion <= 480 && !process.browser) {
		return true
	}

	if (userAgent?.isTablet && resoultion >= 480 && resoultion <= 1024 && !process.browser) {
		return true
	}

	return isMobile
}
export default useResolution
