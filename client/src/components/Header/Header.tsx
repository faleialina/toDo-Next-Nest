import Link from 'next/link'
import style from './header.module.scss'
export default function Header() {
	return (
		<div className={style.colorinfo}>
			<div className={style.colorNav}>
				<div className={style.navigation}>
					<div className={style.logomain}>
						<h1>TO DO</h1>
					</div>
					<div className={style.elemNavig}>
						<p>
							<Link href='/'>Home</Link>
						</p>
						<p>
							<Link href='/about'>About</Link>
						</p>
						<p>
							<Link href='/registration'>Registration</Link>
						</p>
						<p>
							<Link href='/authorization'>Authorization</Link>
						</p>
					</div>
					<button className={style.btn}>Exit</button>
				</div>
			</div>
		</div>
	)
}
