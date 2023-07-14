import { useState } from 'react'
import { Button } from '../button/button'
import { updateTodo, deleteTodo } from '../../api'
import styles from './todo.module.css'

export const Todo = ({ id, title, completed }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [currentTitle, setCurrentTitle] = useState(title)
	const [newTitle, setNewTitle] = useState(title)

	const onTitleChange = ({ target }) => {
		setNewTitle(target.value)
	}

	const onTodoEdit = () => {
		setIsEditing(true)
	}

	const onTodoSave = () => {
		setIsEditing(false)
		updateTodo({ id, title: newTitle }).then(() => {
			setCurrentTitle(newTitle)
		})
	}

	const onTodoRemove = () => {
		deleteTodo(id)
	}

	return (
		<div className={styles.todo}>
			<input
				className={styles.checkbox}
				type="checkbox"
				checked={completed}
				readOnly
			/>
			<div className={styles.title}>
				{isEditing ? (
					<input type="text" value={newTitle} onChange={onTitleChange} />
				) : (
					<div onClick={onTodoEdit}>{currentTitle}</div>
				)}
			</div>
			<div>
				{isEditing ? (
					<Button onClick={onTodoSave}>✒</Button>
				) : (
					<Button onClick={onTodoRemove}>✖</Button>
				)}
			</div>
		</div>
	)
}
