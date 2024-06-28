'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/header/header'
import Footer from './components/footer/footer'

type TemplateProps = {
    children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }) => {
    const pathname = usePathname()
    const [showTransition, setShowTransition] = useState(false)

    useEffect(() => {
        setShowTransition(true)
        const timer = setTimeout(() => setShowTransition(false), 350) 
        return () => clearTimeout(timer)
    }, [pathname])

    const transitionVariants = {
        initial: { clipPath: 'circle(100% at 50% 50%)' },
        exit: { clipPath: 'circle(0% at 50% 50%)' },
    }

    return (
        <AnimatePresence mode="wait">
            {showTransition ? (
                <motion.div
                    key="pathname"
                    initial="initial"
                    animate="initial"
                    exit="exit"
                    variants={transitionVariants}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className='transitionLayer'
                />
            ): <><Header />
            <main>{children}</main>
            <Footer /></>}   
        </AnimatePresence>
    )
}

export default Template
