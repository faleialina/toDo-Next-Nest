'use client'
import Inputs from '@/components/Inputs/Inputs'
import axios from 'axios'
import { useReducer, useState } from 'react'
import redirectReducer from '../components/RedirectReducer/RedirectReducer'
import style from './page.module.scss'

const Main: React.FC = () => {
	const [inp, setInp] = useState({})
	const array = ['email', 'pwd']
	const [redirect, dispatchRedirect] = useReducer(redirectReducer, '')

	async function authUser() {
		const result = await axios.post('http://localhost:5000/auth/authenticate', inp)
		console.log(result.data)
	}

	// const handleRedirectHome = () => {
	// 	dispatchRedirect({ type: 'REDIRECT_HOME' })
	// }

	// const handleRedirectRegistration = () => {
	// 	dispatchRedirect({ type: 'REDIRECT_REGISTRATION' })
	// }
	return (
		<div>
			<div className={style.authpage}>
				<div className={style.info}>
					<h1>Authorization</h1>
					<Inputs array={array} setInp={setInp} inp={inp} />
					<div className={style.btn} onClick={authUser}>
						Login
					</div>
				</div>
			</div>
		</div>
	)
}
export default Main
