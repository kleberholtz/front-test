import React from 'react'
import SignUpForm from './SignUpForm'

const SignUp = () => {
	return (
		<div className="flex flex-col max-w-96">
			<div className="mb-6">
				<h3 className="mb-1">Inscrever-se</h3>
				<p>Pronto para começar? Insira suas informações para criar uma conta!</p>
			</div>
			<SignUpForm disableSubmit={false} />
		</div>

	)
}

export default SignUp