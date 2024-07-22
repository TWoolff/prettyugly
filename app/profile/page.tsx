'use client'
import { useState } from 'react'
import SavedProducts from '../components/saved/saved'
import { getCustomer, Customer } from '../utils/getCustomer'
import Input from '../components/formelements/input'
import Button from '../components/formelements/button'
import Modal from '../components/modal/modal'
import css from './profile.module.css'

const Profile: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [customer, setCustomer] = useState<Customer>(null)
    const [showModal, setShowModal] = useState(false)

    const fetchCustomer = async (email: string, password: string) => {
        const customerData = await getCustomer(email, password)
        if (customerData) {
            setCustomer(customerData)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!customer) { 
            fetchCustomer(email, password) 
        } else { 
            setCustomer(null) 
            setEmail('')
            setPassword('')
        }
    }

    return ( 
        <section className={`grid ${css.profile}`}>
            <article>
                <h1>Your Profile</h1>
                <form onSubmit={handleSubmit}>
                    {!customer && (
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
                    <Button type='submit' title={!customer ? 'Log in' : 'Log out'} className={css.btn} />
                    {!customer && <p>Dont have an account? <a href='#' onClick={() => setShowModal(true)}>Sign up</a></p>}
                </form>
                {customer ? (
                    <>
                        <h2>Account Information</h2>
                        <p>Name: {customer.name}</p>
                        <p>Email: {customer.email}</p>
                        {customer.phone && <p>Phone: {customer.phone}</p>}
                        {customer.address && <p>Address: {customer.address}</p>}
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
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </section>
    )
}

export default Profile
