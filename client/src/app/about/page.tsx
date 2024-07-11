import { useState } from 'react'
import style from './about.module.scss'
import { iUser } from '@/interfaces'
import { useParams } from 'next/navigation'

const About: React.FC = () => {
	const dataId = useParams()
	const [listUsers, settUsers] = useState<iUser[]>([])

	return <main className={style.main}>About</main>
}
export default About;
