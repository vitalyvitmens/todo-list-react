import styles from './button.model.css'

export const Button = ({ children, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	)
}
