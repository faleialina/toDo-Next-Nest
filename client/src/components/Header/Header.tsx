import Link from 'next/link'
import routes from '../Routes/routes'
import style from './header.module.scss'
const Header: React.FC = () => {
	return (
		<div className={style.colorinfo}>
			<div className={style.colorNav}>
				<div className={style.navigation}>
					<div className={style.logomain}>
						<h1>TO DO</h1>
					</div>
					<div className={style.elemNavig}>
						{routes.map(item => (
							<p key={item.name}>{<Link href={item.url}>{item.name}</Link>}</p>
						))}
					</div>
					<button className={style.btn}>Exit</button>
				</div>
			</div>
		</div>
	)
}
export default Header
