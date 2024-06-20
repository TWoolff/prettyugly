
import type { Metadata } from 'next'
import { AppProvider } from './context'
import './styles/index.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'

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
