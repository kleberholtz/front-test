// import { useTranslation } from 'react-i18next'
import { Card, Button } from 'components/ui'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { APP_NAME } from 'constants/app.constant'

const Home = () => {
	// const { t } = useTranslation()
	useEffect(() => {
		document.title = `${APP_NAME} - Home`
	}, [])

	return (
		<div className="flex flex-col items-center h-full">
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-4xl font-bold">Dashboard</h1>
				<p className="text-lg">Bem-vindo ao {APP_NAME}</p>
			</div>
		</div>
	)
}

export default Home