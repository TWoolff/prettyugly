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
				<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="d2268157-8075-4fe0-a7cb-265968fd52ad" data-blockingmode="auto" type="text/javascript"></script>
			</body>
		</html>
	)
}

export default RootLayout
