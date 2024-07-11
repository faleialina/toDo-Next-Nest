export interface iTask {
	id: string
	title: string
	description: string
	isCheck: boolean
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
