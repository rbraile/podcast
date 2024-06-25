import { FC } from 'react'
import styles from './footer.module.scss'

export type FooterProps = Record<string, never>

/**
 * @function Footer
 * @category Layout
 * @description Bottom bar containing the description of the website.
 */
const Footer: FC<FooterProps> = () => (
	<footer className={styles.footer}>
		<h2>FOOTER</h2>
	</footer>
)

export default Footer
