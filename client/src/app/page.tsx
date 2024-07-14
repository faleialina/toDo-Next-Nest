'use client'
import Inputs from '@/components/Inputs/Inputs'
import axios from 'axios'
import { useState } from 'react'
import style from './page.module.scss'

const Main: React.FC = () => {
	const [inp, setInp] = useState({})
	const array = ['email', 'pwd']

	async function authUser() {
		try {
			const result: any = await axios.post(
				'http://localhost:5000/auth/authenticate',
				inp
			)
			localStorage.setItem('userParams', JSON.stringify(result.data))
			window.location.href = `/home`
		} catch (error: any) {
			console.log(error.message)
			alert('Введены некорректные данные')
		}
	}

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
