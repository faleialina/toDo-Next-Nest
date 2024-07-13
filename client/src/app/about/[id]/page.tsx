'use client'
import ListTask from '@/components/ListTask/ListTask'
import { iUser } from '@/interfaces'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import style from './about.module.scss'

const About: React.FC = () => {
	const dataId = useParams()
	const [listUsers, setListUsers] = useState<iUser[]>([])
	const [userObj, setUserObj] = useState<iUser>({
		id: '',
		email: '',
		name: '',
		surname: '',
		pwd: '',
	})
	const [follower, setFollower] = useState({})
	const [active, setActive] = useState<boolean>(false)
	const [showListTask, setShowListTask] = useState<boolean>(false)

	async function authUser() {
		const result = await axios.get(`http://localhost:5000/user/${dataId.id}`)

		setUserObj(result.data)
	}

	const getItemsList = async () => {
		const res = await axios.get(`http://localhost:5000/user`)
		setListUsers(res.data)
	}

	const addFollower = async (follower_id: number) => {
		setFollower({
			...follower,
			user_id: parseFloat(`${dataId.id}`),
			follower_id: follower_id,
		})
		const result = await axios.post(`http://localhost:5000/follower`, follower)
		console.log(result)
		console.log(follower)
		console.log(follower_id)
	}

	const handleSeeClick = () => {
		setShowListTask(elem => !elem)
	}

	useEffect(() => {
		authUser()
		getItemsList()
		setActive(true)
	}, [])
	return (
		<>
			<div className={style.wrapper}>
				<h1>USER LIST</h1>
				<h1>user:{userObj.name}</h1>

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
										onClick={() => handleSeeClick()}
									>
										SEE
									</button>
								</div>

								{showListTask && <ListTask item={item.id} />}
								<div className={style.line}></div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}
export default About
