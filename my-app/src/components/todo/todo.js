import styles from './todo.module.css'

export const Todo = ({ title, completed }) => {
	return (
		<div className={styles.todo}>
			<input
				className={styles.checkbox}
				type="checkbox"
				checked={completed}
				readOnly
			/>
			{title}
		</div>
	)
}
