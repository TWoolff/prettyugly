'use client'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import useCustomCursor from './utils/useCustomCursor'

type TemplateProps = {
    children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }) => {
    useCustomCursor();

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Template
