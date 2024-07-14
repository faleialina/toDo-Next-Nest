'use client'
import Link from 'next/link'
import routes from '../Routes/routes'
import style from './header.module.scss'


const Header: React.FC = () => {
	let current: any[] = []


	const HomePage = () => {
		const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

		current = currentUrl.includes('http://localhost:3000/home') || currentUrl.includes('http://localhost:3000/about') ?
			routes.filter(el => el.name == 'Home' || el.name == 'About') : routes.filter(el => el.name == 'Registration' || el.name == 'Authorization')
	};

	HomePage()

	return (
		<div className={style.colorinfo}>
			<div className={style.colorNav}>
				<div className={style.navigation}>
					<div className={style.logomain}>
						<h1>TO DO</h1>
					</div>
					<div className={style.elemNavig}>
						{current.map(item => (
							<p key={item.name}>{<Link href={item.url}>{item.name}</Link>}</p>
						))}
					</div>

					<button className={style.btn} onClick={() => {
						localStorage.clear();
						window.location.href = `/`
					}}>
						Exit
					</button>
				</div>
			</div>
		</div>
	)
}
export default Header
