'use client'
import { useState } from 'react'
import SavedProducts from '../components/saved/saved'
import { getCustomer, updateCustomer, deleteCustomer } from '../utils/crudCustomer'
import Input from '../components/formelements/input'
import Button from '../components/formelements/button'
import Modal from '../components/modal/modal'
import css from './profile.module.css'
import { useAppContext } from '../context'

const Profile: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [line1, setLine1] = useState('')
    const [line2, setLine2] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const id = state.customer?.id ?? ''

    const fetchCustomer = async (email: string, password: string) => {
        const customerData = await getCustomer(email, password)
        if (customerData) {
            dispatch({ type: 'SET_CUSTOMER', payload: customerData })
        }
    }

    const handleUpdateCustomer = async (updates: any) => {
        const customerData = await updateCustomer(id, updates)
        dispatch({ type: 'SET_CUSTOMER', payload: customerData })
    }

    const handleDeleteCustomer = async (id: string) => {
        const result = await deleteCustomer(id)
        if (result.success) {
            dispatch({ type: 'SET_CUSTOMER', payload: null })
            setDeleted(true)
        } else {
            console.error(result.error)
        }
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!state.customer) { 
            fetchCustomer(email, password) 
        } else { 
            dispatch({ type: 'SET_CUSTOMER', payload: null })
            setEmail('')
            setPassword('')
        }
    }

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updates: any = {}
        if (name) updates.name = name
        if (email) updates.email = email
        if (phone) updates.phone = phone
        const address: any = {}
        if (line1) address.line1 = line1
        if (line2) address.line2 = line2
        if (postalCode) address.postal_code = postalCode
        if (city) address.city = city
        if (country) address.country = country
        if (Object.keys(address).length > 0) updates.address = address
        handleUpdateCustomer(updates)
    }

    const handleDelete = () => {
        handleDeleteCustomer(id)
    }

    return ( 
        <section className={`grid ${css.profile}`}>
            <article>
                <h1>Your Profile</h1>
                <form onSubmit={handleLogin}>
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
                    {!state.customer && <Button type='submit' title='Sign in' className={css.btn} />}
                    {!state.customer && <p>Dont have an account? <a href='#' onClick={() => setIsOpen(true)}>Sign up</a></p>}
                </form>
                {state.customer ? (
                    <>
                        <h2>Account Information</h2>
                        <form onSubmit={handleUpdate}>
                            <Input 
                                type='text' 
                                value={name} 
                                placeholder={state.customer.name}
                                id='name' 
                                name='name'
                                onChange={(e) => setName(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.name ?? ''}
                                label='Name' 
                            />
                            <Input 
                                type='email' 
                                value={email} 
                                placeholder={state.customer.email}
                                id='email' 
                                name='email' 
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.email ?? ''}
                                label='Email' 
                            />
                            <Input 
                                type='tel' 
                                value={phone} 
                                placeholder={state.customer.phone ?? ''}
                                id='phone' 
                                name='phone' 
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.phone ?? ''}
                                label='Phone' 
                            />
                            <Input 
                                type='text' 
                                value={line1}
                                placeholder={state.customer.address?.line1 ?? ''} 
                                id='line1' 
                                name='line1' 
                                onChange={(e) => setLine1(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.address?.line1 ?? ''}
                                label='Address Line 1' 
                            />
                            <Input 
                                type='text' 
                                value={line2}
                                placeholder={state.customer.address?.line2 ?? ''} 
                                id='line2' 
                                name='line2' 
                                onChange={(e) => setLine2(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.address?.line2 ?? ''}
                                label='Address Line 2' 
                            />
                            <Input 
                                type='text' 
                                value={postalCode}
                                placeholder={state.customer.address?.postal_code ?? ''} 
                                id='postalCode' 
                                name='postalCode' 
                                onChange={(e) => setPostalCode(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.address?.postal_code ?? ''}
                                label='Postal Code' 
                            />
                            <Input 
                                type='text' 
                                value={city}
                                placeholder={state.customer.address?.city ?? ''} 
                                id='city' 
                                name='city' 
                                onChange={(e) => setCity(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.address?.city ?? ''}
                                label='City' 
                            />
                            <Input 
                                type='text' 
                                value={country}
                                placeholder={state.customer.address?.country ?? ''} 
                                id='country' 
                                name='country' 
                                onChange={(e) => setCountry(e.target.value)}
                                onFocus={(e) => e.currentTarget.placeholder = ''}
                                onBlur={(e) => e.currentTarget.placeholder = state.customer?.address?.country ?? ''}
                                label='Country' 
                            />
                            <Button type='submit' title={'Update Profile'} className={css.btn} />  
                        </form>
                        <Button title={'Unsubscribe'} className={css.btn} onClick={handleDelete} />
                        <h2>Order History</h2>
                        {/* Render order history here */}
                        <p>Order 1</p>
                    </>
                ) : (
                    !deleted ? <h2>Please log in to view your profile information.</h2> : <h2>Your account has been deleted.</h2>
                )}
            </article>
            <SavedProducts />
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>
    )
}

export default Profile
