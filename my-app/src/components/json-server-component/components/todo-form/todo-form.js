import styles from './todo-form.module.css'

export const TodoForm = ({
	onSubmit,
	todo,
	setTodo,
	requestAddTodo,
	isUpdating,
}) => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<input
				type="text"
				value={todo}
        name="todo-input"
				placeholder="Новая задача"
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button
				disabled={isUpdating || todo === ''}
				className={styles.btnBlue}
				type="submit"
				onClick={requestAddTodo}
			>
				Добавить
			</button>
		</form>
	)
}
