import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelctor, minutsState } from "./atoms";

function App() {
	const [minutes, setMinutes] = useRecoilState(minutsState);
	const [hours, setHours] = useRecoilState(hourSelctor);
	const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
		setMinutes(+e.currentTarget.value);
	}
	const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
		setHours(+e.currentTarget.value);
	}
	return (
		<div>
			<input
				value={minutes}
				onChange={onMinutesChange}
				type="number"
				placeholder="Minutes"
			/>
			<input
				value={hours}
				onChange={onHoursChange}
				type="number"
				placeholder="Hours"
			/>
		</div>
	)
}

export default App;