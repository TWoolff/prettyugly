import { useState, useEffect } from 'react'
import { hasCookie, setCookie } from 'cookies-next'
import css from './cookieconsent.module.css'
import Button from '../formelements/button'

const CookieConsent: React.FC = () => {
    const [showConsent, setShowConsent] = useState(false)

    useEffect(() => {
        setShowConsent(hasCookie('localConsent'))
    }, [])

    const acceptCookie = () => {
        setShowConsent(true)
        setCookie("localConsent", "true", {})
    }
    
    if (showConsent) {
        return null
    }
    
    return ( 
        <aside className={css.cookieconsent}>
            <p>This website uses cookies to enhance the user experience.</p><p>By using this website, you agree to the use of cookies. We do not use cookies or any infomation gathered for marketing you have not opted in for.</p>
            <Button onClick={acceptCookie} title='Accept' className={css.cookiebtn} />
        </aside>
     )
}
 
export default CookieConsent