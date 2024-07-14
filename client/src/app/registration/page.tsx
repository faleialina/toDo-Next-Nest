'use client'
import Inputs from '@/components/Inputs/Inputs'
import axios from 'axios'
import { useState } from 'react'
import style from './registration.module.scss'

const Registration: React.FC = () => {
	const [inp, setInp] = useState({})

	const array = ['name', 'surname', 'email', 'pwd']
	async function show() {
		try {
			const result = await axios.post('http://localhost:5000/auth/register', inp)
			localStorage.setItem('userParams', JSON.stringify(result.data))
			window.location.href = `/home`
		} catch (error: any) {
			console.log(error.message)
			alert('Введены некорректные данные')
		}
	}

	return (
		<div className={style.regpage}>
			<div className={style.info}>
				<h1>Registration</h1>
				<Inputs array={array} setInp={setInp} inp={inp} />
				<div className={style.btn} onClick={show}>
					Sign Up
				</div>
			</div>
		</div>
	)
}
export default Registration
