import styles from './app.module.css'
import {
	Loader,
	JsonPlaceholderComponent,
	JsonServerComponent,
	FirebaseComponent,
} from './components'

export const App = () => {
	return (
		<div className={styles.app}>
			<JsonPlaceholderComponent Loader={Loader} />
			<JsonServerComponent Loader={Loader} />
			<FirebaseComponent Loader={Loader} />
		</div>
	)
}
