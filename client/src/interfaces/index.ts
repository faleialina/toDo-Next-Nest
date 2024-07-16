export interface iTask {
	id: string
	title: string
	description: string
	isCheck: boolean
	user_id:string
}

export interface ModalProps {
	setOpen: (arg: boolean) => void
	task: iTask
}

export interface iUser {
	id: string
	email: string
	name: string
	surname: string
	pwd: string
}
export interface iFollower {
	id: string
	user_id: string
	follower_id: string
}
