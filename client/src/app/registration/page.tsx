'use client'
import Inputs from '@/components/Inputs/Inputs'
import axios from 'axios'
import { useState } from 'react'
import style from './registration.module.scss'

const Registration: React.FC = () => {
	const [inp, setInp] = useState({})

	const array = ['name', 'surname', 'email', 'pwd']
	async function show() {
		const result = await axios.post('http://localhost:5000/api/reg', inp)
		console.log(result.data)
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
