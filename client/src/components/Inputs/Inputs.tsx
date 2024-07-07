function Inputs({ array, inp, setInp }: any) {
	function changeInput(event: any) {
		setInp({ ...inp, [event.target.name]: event.target.value })
	}

	const res = array.map((elem: any, index: any) => (
		<div key={index}>
			{' '}
			<input
				type='text'
				name={elem}
				placeholder={elem}
				onChange={changeInput}
			/>
		</div>
	))

	return <>{res}</>
}
export default Inputs
