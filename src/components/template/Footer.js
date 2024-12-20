import React from 'react'
import classNames from 'classnames'
import { Container } from 'components/shared'
import { APP_NAME } from 'constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from 'constants/theme.constant'

const FooterContent = () => {
	return (
		<div className="flex items-center justify-between flex-auto w-full">
			<span>Direitos autorais &copy; {`${new Date().getFullYear()}`} <span className="font-semibold">{`${APP_NAME}`}</span> Todos os direitos reservados.</span>
			<div className="">
				<a className="text-gray" href="/terms">Termos e Condições</a>
				<span className="mx-2 text-muted"> | </span>
				<a className="text-gray" href="/privacy-policy">Política de Privacidade</a>
			</div>
		</div>
	)
}

export default function Footer({ pageContainerType }) {

	return (
		<footer
			className={
				classNames(
					`footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`,
				)
			}
		>
			{
				pageContainerType === 'contained'
					?
					<Container>
						<FooterContent />
					</Container>
					:
					<FooterContent />
			}
		</footer>
	)
}

