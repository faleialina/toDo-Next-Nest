'use client'
import ListTask from '@/components/ListTask/ListTask'
import { iUser } from '@/interfaces'
import axios from 'axios'
import { useEffect, useState } from 'react'
import style from './about.module.scss'

const About: React.FC = () => {
	const getParams: any = localStorage.getItem('userParams')
	const userParams = JSON.parse(getParams)

	const [listUsers, setListUsers] = useState<iUser[]>([])

	const [follower, setFollower] = useState({})
	const [active, setActive] = useState<boolean>(false)
	const [showListTask, setShowListTask] = useState<any>({})

	const getItemsList = async () => {
		const res = await axios.get(`http://localhost:5000/user`)
		setListUsers(res.data)
	}

	const addFollower = async (follower_id: number) => {
		setFollower({
			...follower,
			user_id: parseFloat(`${userParams.id}`),
			follower_id: follower_id,
		})
		const result = await axios.post(`http://localhost:5000/follower`, follower)
	}

	useEffect(() => {
		getItemsList()
		setActive(true)
	}, [])
	return (
		<>
			<div className={style.wrapper}>
				<h1>USER LIST</h1>
				<h1>user:{userParams.name}</h1>

				{listUsers.length == 0 ? (
					<div className={style.empty}>
						<h2>Empty...</h2>
					</div>
				) : (
					<div className={style.toDoListItems}>
						{listUsers.map((item, index) => (
							<div className={style.todoItemWrap} key={item.id}>
								<div className={style.todoItem}>
									<button
										className={style.button}
										key={item.id}
										name={String(index)}
										onClick={() => addFollower(parseInt(item.id))}
									>
										{!active ? 'following' : 'false'}
									</button>
									<p className={style.def}>{item.name}</p>
									<p className={style.def}>{item.surname}</p>
									<button
										key={item.id}
										name={String(item.id)}
										className={style.button}
										onClick={() =>
											setShowListTask(
												showListTask.hasOwnProperty(item.id)
													? {
															...showListTask,
															[item.id]: !showListTask[item.id],
													  }
													: { ...showListTask, [item.id]: true }
											)
										}
									>
										SEE
									</button>
								</div>
								{showListTask[item.id] ? <ListTask item={item.id} /> : null}
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}
export default About
