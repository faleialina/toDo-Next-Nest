'use client'
import ListTask from '@/components/ListTask/ListTask'
import { iFollower, iUser } from '@/interfaces'
import axios from 'axios'
import { useEffect, useState } from 'react'
import style from './about.module.scss'

const About: React.FC = () => {
	const getParams: any = localStorage.getItem('userParams')
	const userParams = JSON.parse(getParams)

	const [listUsers, setListUsers] = useState<iUser[]>([])
	const [showListTask, setShowListTask] = useState<any>({})
	const [showButton, setShowButton] = useState<any>({})
	const [userFollower, setUserFollewer] = useState<iFollower[]>([])

	const getItemsList = async () => {
		const res = await axios.get(`http://localhost:5000/user`)
		setListUsers(res.data)
	}

	const getFollower = async () => {
		const res = await axios.get(
			`http://localhost:5000/follower/${userParams.id}`
		)
		setUserFollewer(res.data)
		console.log(res.data)
	}

	const addFollower = async (follower_id: number) => {
		const result = await axios.post(`http://localhost:5000/follower`, {
			user_id: userParams.id,
			follower_id: follower_id,
		})

		setUserFollewer([...userFollower, result.data])
		console.log(userFollower)
	}

	const deleteFollower = async (id: number) => {
		const userFal = (userFollower?.filter((el: any) => el.follower_id == id))[0].id
		const res: any = await axios.delete(
			`http://localhost:5000/follower/${userFal}`
		)

		const resFilter = userFollower?.filter((el: any) => el?.id != userFal)
		setUserFollewer([...resFilter])
	}

	useEffect(() => {
		getFollower()
		getItemsList()
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
								<div className={style.todoItem} key={item.id}>
									{userFollower.some((el: iFollower) => el.follower_id == item.id) ? (
										<button
											className={style.button}
											key={item.id}
											name={String(index)}
											onClick={() => {
												deleteFollower(parseInt(item.id))
												setShowButton(
													showButton.hasOwnProperty(item.id)
														? {
																...showButton,
																[item.id]: !showButton[item.id],
														  }
														: { ...showButton, [item.id]: true }
												)
											}}
										>
											unsubscribe
										</button>
									) : (
										<button
											className={style.button}
											key={item.id}
											name={String(index)}
											onClick={() => {
												addFollower(parseInt(item.id))
												setShowButton(
													showButton.hasOwnProperty(item.id)
														? {
																...showButton,
																[item.id]: !showButton[item.id],
														  }
														: { ...showButton, [item.id]: true }
												)
											}}
										>
											subscribe
										</button>
									)}

									<p className={style.def}>{item.name}</p>
									<p className={style.def}>{item.surname}</p>
									{userFollower.some(el => el.follower_id == item.id) ? (
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
									) : null}
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
