import { Field, Form, Formik } from 'formik'
import { Input, Button, Checkbox, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import * as Yup from 'yup'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { useEffect, useRef, useState } from 'react'
import useAuth from 'utils/hooks/useAuth'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Link } from 'react-router-dom'

const validationSchema = Yup.object().shape({
	email: Yup.string().required('Por favor, insira seu email.').email('Por favor, insira um email válido.'),
	password: Yup.string().required('Por favor, insira sua senha').min(6, 'Sua senha deve ter no mínimo 6 caracteres.'),
	remember_me: Yup.bool(),
})

const SignInForm = props => {
	const { disableSubmit = false, className } = props

	const { signIn } = useAuth()
	const [message, setMessage] = useTimeOutMessage(15 * 1000)

	const [needCaptcha, setNeedCaptcha] = useState(false);
	const [captchaToken, setCaptchaToken] = useState(null);
	const captchaRef = useRef(null);
	useEffect(() => {
		// if (captchaToken)
			// console.log(`hCaptcha Token: ${captchaToken}`);

	}, [captchaToken]);

	const onSignIn = async (values, setSubmitting) => {
		const { email, password, remember_me } = values

		setSubmitting(true)
		const result = await signIn(email, password, remember_me)
		setNeedCaptcha(result.needCaptcha)

		if (!result.success) {
			if (result.message === 'Invalid captcha.') {
				setNeedCaptcha(true)
			}

			if (result.message === 'Please complete the captcha challenge.') {
				captchaRef.current.execute()
			}

			setMessage(result.message)
		}

		// Reset captcha after try login
		if (needCaptcha && captchaToken) {
			setCaptchaToken(null)
			captchaRef.current.resetCaptcha()
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				// Remove this initial value
				initialValues={{
					email: '',
					password: '',
					remember_me: true
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (!disableSubmit) {
						onSignIn(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({ touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer>
							<FormItem
								label="E-mail"
								invalid={errors.email && touched.email}
								errorMessage={errors.email}
							>
								<Field
									type="text"
									autoComplete="on"
									name="email"
									placeholder="E-mail"
									component={Input}
								/>
							</FormItem>
							<FormItem
								label="Senha"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off"
									name="password"
									placeholder="Senha"
									component={PasswordInput}
								/>
							</FormItem>
							<div className="flex flex-row justify-between mb-4">
								<Field className="mb-0" name="remember_me" component={Checkbox} children="Lembre de mim" />
								<ActionLink to={"/forgot-password"}>
									Esqueceu sua senha?
								</ActionLink>
							</div>
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{isSubmitting ? 'Entrando...' : 'Entrar'}
							</Button>
							<div className="mt-4 text-center">
								<span>Ainda não tem uma conta? </span>
								<ActionLink to={"/sign-up"}>
									Inscrever-se
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm