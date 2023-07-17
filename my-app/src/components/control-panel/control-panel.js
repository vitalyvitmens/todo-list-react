import { Button } from '../button/button'
import { Search, Sorting } from './components'
import styles from './contral-panel.module.css'

export const ControlPanel = ({ onTodoAdd, onSearch, onSorting }) => {
	return (
		<div className={styles.controlPanel}>
			<Search onSearch={onSearch} />
			<Sorting onSorting={onSorting} />
			<Button onClick={onTodoAdd}>✚</Button>
		</div>
	)
}
