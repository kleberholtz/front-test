import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Por favor, insira seu nome').min(4, 'Seu nome deve ter no mínimo 4 caracteres'),
	email: Yup.string().email('E-mail inválido').required('Por favor, insira seu e-mail'),
	password: Yup.string().required('Suas senhas não correspondem'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas não correspondem')
})

const SignUpForm = props => {
	const { disableSubmit = false, className } = props

	const { signUp } = useAuth()
	const [message, setMessage] = useTimeOutMessage(15 * 1000)

	const onSignUp = async (values, setSubmitting) => {
		const { name, email, password } = values

		setSubmitting(true)
		const result = await signUp(name, email, password)
		if (!result.status) {
			setMessage(result.message)
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (!disableSubmit) {
						onSignUp(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({ touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer>
							<FormItem
								label="Nome"
								invalid={errors.name && touched.name}
								errorMessage={errors.name}
							>
								<Field
									type="text"
									autoComplete="off"
									name="name"
									placeholder="Nome"
									component={Input}
								/>
							</FormItem>
							<FormItem
								label="E-mail"
								invalid={errors.email && touched.email}
								errorMessage={errors.email}
							>
								<Field
									type="email"
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
							<FormItem
								label="Confirme sua senha"
								invalid={errors.confirmPassword && touched.confirmPassword}
								errorMessage={errors.confirmPassword}
							>
								<Field
									autoComplete="off"
									name="confirmPassword"
									placeholder="Confirme sua senha"
									component={PasswordInput}
								/>
							</FormItem>
							<Button
								block
								loading={isSubmitting}
								variant="solid"
								type="submit"
							>
								{isSubmitting ? 'Criando Conta...' : 'Criar Conta'}
							</Button>
							<div className="mt-4 text-center">
								<span>Já tem uma conta? </span>
								<ActionLink to={"/sign-in"}>
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

export default SignUpForm