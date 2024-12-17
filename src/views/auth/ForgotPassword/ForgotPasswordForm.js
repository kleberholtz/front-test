import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { ActionLink } from 'components/shared'

import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
	email: Yup.string().required('Por favor, insira seu e-mail'),
})

const ForgotPasswordForm = props => {

	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

	const [emailSent, setEmailSent] = useState(false)

	const [message, setMessage] = useTimeOutMessage()

	const onSendMail = async (values, setSubmitting) => {
		setSubmitting(true)
		try {
			// const resp = await apiForgotPassword(values)
			// if (resp.data) {
			// 	setSubmitting(false)
			// 	setEmailSent(true)
			// }
		} catch (errors) {
			setMessage(errors?.response?.data?.message || errors.toString())
			setSubmitting(false)
		}
	}

	return (
		<div className={className}>
			<div className="mb-6">
				{
					emailSent ?
						<>
							<h3 className="mb-1">Verifique seu e-mail</h3>
							<p>Enviamos uma instrução de recuperação de senha para seu e-mail</p>
						</>
						:
						<>
							<h3 className="mb-1">Esqueceu sua senha?</h3>
							<p>Insira seu endereço de e-mail para receber um código de verificação</p>
						</>
				}
			</div>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					email: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (!disableSubmit) {
						onSendMail(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({ touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer>
							<div className={emailSent ? 'hidden' : ''}>
								<FormItem
									invalid={errors.email && touched.email}
									errorMessage={errors.email}
								>
									<Field
										type="email"
										autoComplete="off"
										name="email"
										placeholder="E-mail"
										component={Input}
									/>
								</FormItem>
							</div>
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{emailSent ? 'Reenviar e-mail' : 'Enviar e-mail'}
							</Button>
							<div className="mt-4 text-center">
								<span>Voltar para </span>
								<ActionLink to={signInUrl}>
									Entrar
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ForgotPasswordForm