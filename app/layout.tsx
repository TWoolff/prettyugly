
import type { Metadata } from 'next'
import { AppProvider } from './context'
import Header from './components/header/header'
import Footer from './components/footer/footer'
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
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
