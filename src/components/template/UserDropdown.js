import React, { useEffect } from 'react'
import { Badge, Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'
import API from 'services/API'

const dropdownItemList = [
	// { label: 'Perfil', path: '/me/settings/profile', icon: <HiOutlineUser /> },
]

export const UserDropdown = ({ className }) => {
	const user = useSelector((state) => state.auth.user)
	const session = useSelector((state) => state.auth.session)
	const { signOut } = useAuth()

	useEffect(() => {
		if (session.signedIn && session.token) {
			API.setToken(session.token)
		}

		const expiresAt = new Date(session.expires_at)
		if (expiresAt < new Date()) {
			signOut()
			return
		}

		const expiresMs = expiresAt.getTime() - new Date().getTime()
		const timeout = setTimeout(() => {
			signOut()
		}, expiresMs)
		return () => clearTimeout(timeout)
	}, [])

	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			<Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
		</div>
	)

	return (
		<div>
			<Dropdown menuStyle={{ minWidth: 240 }} renderTitle={UserAvatar} placement="bottom-end">
				<Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						<Avatar shape="circle" icon={<HiOutlineUser />} />
						<div>
							{user.is_member && (
								<div className="font-bold text-gray-900 dark:text-gray-100">{user.name} <Badge innerClass="bg-purple-500" content="Member" /></div>
							) || (
									<div className="font-bold text-gray-900 dark:text-gray-100">{user.name}</div>
								)}
							<div className="text-xs">{user.email}</div>
						</div>
					</div>
				</Dropdown.Item>
				<Dropdown.Item variant="divider" />
				{dropdownItemList.map(item => (
					<Dropdown.Item eventKey={item.label} key={item.label} className="mb-1">
						<Link className="flex gap-2 items-center" to={item.path}>
							<span className="text-xl opacity-50">{item.icon}</span>
							<span>{item.label}</span>
						</Link>
					</Dropdown.Item>
				))}
				{/* <Dropdown.Item variant="divider" /> */}
				<Dropdown.Item onClick={signOut} eventKey="Sign Out" className="gap-2">
					<span className="text-xl opacity-50">
						<HiOutlineLogout />
					</span>
					<span>Sair</span>
				</Dropdown.Item>
			</Dropdown>
		</div>
	)
}

export default withHeaderItem(UserDropdown)
