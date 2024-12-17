import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
	return (
		<div className="flex flex-col max-w-96">
			<div className="mb-6">
				<h3 className="mb-1">Bem-vindo!</h3>
				<p>Insira suas credenciais para fazer login!</p>
			</div>
			<SignInForm disableSubmit={false} />
		</div>
	)
}

export default SignIn