'use client'
import { useState } from 'react'
import SavedProducts from '../components/saved/saved'
import { getCustomer } from '../utils/getCustomer'
import Input from '../components/formelements/input'
import Button from '../components/formelements/button'
import Modal from '../components/modal/modal'
import css from './profile.module.css'
import { useAppContext } from '../context'

const Profile: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const fetchCustomer = async (email: string, password: string) => {
        const customerData = await getCustomer(email, password)
        if (customerData) {
            dispatch({ type: 'SET_CUSTOMER', payload: customerData })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!state.customer) { 
            fetchCustomer(email, password) 
        } else { 
            dispatch({ type: 'SET_CUSTOMER', payload: null })
            setEmail('')
            setPassword('')
        }
    }

    return ( 
        <section className={`grid ${css.profile}`}>
            <article>
                <h1>Your Profile</h1>
                <form onSubmit={handleSubmit}>
                    {!state.customer && (
                        <>
                            <Input 
                                type='email' 
                                value={email} 
                                id='email' 
                                name='email' 
                                onChange={(e) => setEmail(e.target.value)} 
                                label='Email' 
                                required
                            />
                            <Input 
                                type='password' 
                                value={password} 
                                id='password' 
                                name='password' 
                                onChange={(e) => setPassword(e.target.value)} 
                                label='Password' 
                                required
                            />
                        </>
                    )}
                    <Button type='submit' title={!state.customer ? 'Log in' : 'Log out'} className={css.btn} />
                    {!state.customer && <p>Dont have an account? <a href='#' onClick={() => setIsOpen(true)}>Sign up</a></p>}
                </form>
                {state.customer ? (
                    <>
                        <h2>Account Information</h2>
                        <p>Name: {state.customer.name}</p>
                        <p>Email: {state.customer.email}</p>
                        {state.customer.phone && <p>Phone: {state.customer.phone}</p>}
                        {state.customer.address && <p>Address: {state.customer.address}</p>}
                        <h2>Order History</h2>
                        {/* Render order history here */}
                        <p>Order 1</p>
                        {/* UNSUBSCRIBE BTN */}
                    </>
                ) : (
                    <p>Please log in to view your profile information.</p>
                )}
            </article>
            <SavedProducts />
             <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>
    )
}

export default Profile
