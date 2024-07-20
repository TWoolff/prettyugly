'use client'
import Header from './components/header/header'
import Footer from './components/footer/footer'

type TemplateProps = {
    children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }) => {

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Template
