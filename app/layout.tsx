import type { Metadata} from 'next'
import { AppProvider } from './context'
import './styles/index.css'

export const metadata: Metadata = {
	title: 'PrettyUgly',
	description: 'Jewelry and accessories for the bold and the beautiful',
	metadataBase: new URL("https://prettyugly.fashion/"),
    openGraph: {
        type: "website",
        url: "https://prettyugly.fashion/",
        title: "PrettyUgly",
        description: "Jewelry and accessories for the bold and the beautiful",
        locale: "en_US",
    },
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: "/images/favicon.png",
    },
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
