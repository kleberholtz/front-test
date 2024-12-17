import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { setUser, initialState } from 'store/auth/userSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from 'services/API'
import appConfig from 'configs/app.config'
import React, { useState } from 'react'
import useQuery from './useQuery'

function useAuth() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const query = useQuery()

	const [needCaptcha, setNeedCaptcha] = useState(false);
	const { token, expires_at, signedIn } = useSelector((state) => state.auth.session)

	const signIn = async (email, password, remember_me) => {
		try {
			const resp = await API.User.Auth.Login(email, password, remember_me).then((resp) => {
				setNeedCaptcha(resp.headers.get('x-need-captcha') == 'true' ? true : false)

				return resp.json()
			})

			if (!resp.success) {
				return {
					needCaptcha: needCaptcha,
					success: false,
					message: resp.messages[0]?.message
				}
			}

			const { token, expires_at } = resp.data.access_token
			dispatch(onSignInSuccess({ token, expires_at }))
			dispatch(setUser({
				'name': resp.data.name,
				'email': resp.data.email,
				'phone': resp.data.phone,
				'avatar': resp.data.avatar,
				'permissions': resp.data.permissions,
				'email_verified': resp.data.email_verified,
				'ml_id': resp.data.ml_id,
				'data': resp.data.data,
			}))

			const redirectUrl = query.get(REDIRECT_URL_KEY)
			navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)

			return {
				needCaptcha: needCaptcha,
				success: true,
				message: null,
			}
		} catch (errors) {
			return {
				needCaptcha: needCaptcha,
				success: false,
				message: errors?.response?.messages[0]?.message || errors.toString()
			}
		}
	}

	const signUp = async (name, email, password) => {
		try {
			const resp = await API.User.Register(name, email, password).then((resp) => {
				setNeedCaptcha(resp.headers.get('x-need-captcha') == 'true' ? true : false)

				return resp.json()
			})

			if (!resp.success) {
				return {
					needCaptcha: needCaptcha,
					success: false,
					message: resp.messages[0]?.message
				}
			}

			const { token, expires_at } = resp.data.access_token
			dispatch(onSignInSuccess({ token, expires_at }))
			dispatch(setUser({
				'name': resp.data.name,
				'email': resp.data.email,
				'email_verified': resp.data.email_verified,
				'phone': resp.data.phone,
				'role': resp.data.role,
				'is_member': resp.data.is_member,
				'permissions': resp.data.permissions,
				'avatar': resp.data.avatar,
			}))
		} catch (errors) {
			return {
				needCaptcha: needCaptcha,
				success: false,
				message: errors?.response?.messages[0]?.message || errors.toString()
			}
		}
	}

	const handleSignOut = () => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig.unAuthenticatedEntryPath)
	}

	const signOut = async () => {
		// await apiSignOut()
		handleSignOut()
	}

	return {
		authenticated: token && expires_at && signedIn,
		signIn,
		signUp,
		signOut
	}
}

export default useAuth