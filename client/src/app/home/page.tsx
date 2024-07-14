'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import { iTask } from '../../interfaces'
import style from './home.module.scss'

const Home: React.FC = () => {
	const getParams: any = localStorage.getItem('userParams')
	const userParams = JSON.parse(getParams)

	const [task, setTask] = useState({
		title: '',
		user_id: `${userParams.id}`,
		description: '',
	})

	const [listTasks, setListTasks] = useState<iTask[]>([])
	const [open, setOpen] = useState<boolean>(false)
	const [active, setActive] = useState({
		id: '',
		title: '',
		user_id: `${userParams.id}`,
		description: '',
		isCheck: false,
	})


	function swapCheckbox(index: number) {
		const updatedTasks = [...listTasks]
		updatedTasks[index].isCheck = !updatedTasks[index].isCheck
		setListTasks(updatedTasks)
	}

	function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
		setTask({ ...task, [e.target.name]: e.target.value })
	}

	const addTask = async () => {
		try {
			const res = await axios.post('http://localhost:5000/task', task)
		} catch (err) {
			console.log(err)
		}
	}
	const getItemsList = async () => {
		const res = await axios.get(`http://localhost:5000/task/${userParams.id}`)

		const listTaskCheck = res.data.map((el: iTask) => ({
			...el,
			isCheck: false,
		}))
		setListTasks(listTaskCheck)
	}

	useEffect(() => {
		getItemsList()
	}, [])

	const deleteItem = async (id: string) => {
		const res = await axios.delete(`http://localhost:5000/task/${id}`)
		const newListItems = listTasks.filter((item: any) => item.id !== id)
		setListTasks(newListItems)
	}

	return (
		<>
			<div className={style.wrapper}>
				<h1>TODO LIST</h1>
				<h1>user:{userParams.name}</h1>
				<form className={style.header} onSubmit={() => addTask()}>
					<input
						type='text'
						name='title'
						placeholder='Create note...'
						onChange={changeInput}
						value={task?.title}
					/>
					<input
						type='text'
						name='description'
						placeholder='Create description note...'
						onChange={changeInput}
						value={task?.description}
					/>
					<button type='submit'>CREATE</button>
				</form>
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
										<input
											type='checkbox'
											key={index}
											name={String(index)}
											onChange={() => swapCheckbox(index)}
											checked={item.isCheck}
											className={style.form_checkbox}
										/>
										<p
											className={
												listTasks[index].isCheck ? style.checked : style.def
											}
										>
											{item.title}
										</p>
										<p
											className={
												listTasks[index].isCheck ? style.checked : style.def
											}
										>
											{item.description}
										</p>

										<button
											className={style.updateItem}
											onClick={() => {
												setOpen(true)
												setActive(listTasks[index])
											}}
										></button>

										{open ? <Modal setOpen={setOpen} task={active} /> : null}

										<button
											className={style.deleteItem}
											onClick={() => {
												deleteItem(item.id)
											}}
										></button>
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
export default Home
