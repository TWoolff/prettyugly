import type { Metadata} from 'next'
import { AppProvider } from './context'
import './styles/index.css'

export const metadata: Metadata = {
	title: 'PrettyUgly',
	description: 'Something Something',
}

const RootLayout: React.FC<{children?: React.ReactNode}> = ({children}) => {
	return (
		<html lang='en'>
			<body>
				<AppProvider>
					{children}
				</AppProvider>
			</body>
		</html>
	)
}

export default RootLayout
