import { useEffect, useState } from 'react'
import styles from './json-server-component.module.css'

export const JsonServerComponent = ({ Loader }) => {
	const [todosServer, setTodosServer] = useState([])
	const [isLoadingJsonServerComponent, setIsLoadingJsonServerComponent] =
		useState(false)

	useEffect(() => {
		setIsLoadingJsonServerComponent(true)

		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodosServer(loadedTodo)
			})
			.finally(() => setIsLoadingJsonServerComponent(false))
	}, [])

	return (
		<div className={styles.container}>
			<h3>
				2. Переделать приложение, заменив JSON Placeholder на JSON Server:
			</h3>
			{isLoadingJsonServerComponent ? (
				<Loader />
			) : (
				todosServer.map(({ id, title }) => (
					<div key={id}>
						<ol>
							<span>{id}</span>
							{title}
						</ol>
					</div>
				))
			)}
		</div>
	)
}
