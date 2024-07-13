'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { iTask } from '../../interfaces'
import style from './listTask.module.scss'

export default function ListTask({ item }: { item: string }) {
	const [listTasks, setListTasks] = useState<iTask[]>([])

	const getItemsList = async () => {
		const res = await axios.get(`http://localhost:5000/task/${item}`)
		console.log(res)

		const listTaskCheck = res.data.map((el: iTask) => ({
			...el,
			isCheck: false,
		}))
		setListTasks(listTaskCheck)
	}

	useEffect(() => {
		getItemsList()
	}, [])

	return (
		<>
			<div className={style.wrapper}>
				<h1>TODO LIST</h1>

				{listTasks.length == 0 ? (
					<div className={style.empty}>
						<div className={style.image}></div>
						<h2>Empty...</h2>
					</div>
				) : (
					<div className={style.toDoListItems}>
						{listTasks.map((item, index) => (
							<div className={style.todoItemWrap} key={item.id}>
								<div className={style.todoItem}>
									<>
										<p className={style.def}>{item.title}</p>
										<p className={style.def}>{item.description}</p>
									</>
								</div>

								<div className={style.line}></div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}
