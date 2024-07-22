'use client';
import { useState } from 'react';
import Button from '../formelements/button';
import Input from '../formelements/input';
import { Customer, createCustomer } from '@/app/utils/createCustomer';
import css from './modal.module.css'

type ModalProps = {
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({onClose}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [customer, setCustomer] = useState<Customer[] | null>(null)
    
    // const sendData = async (email: string, password: string) => {
    //     // @ts-ignore
    //     const customerData: Customer[] = await createCustomer(email, password)
    // }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createCustomer(email, password)
    }

    return ( 
        <div className={css.modal}>
            <h2>Sign up</h2>
            <button onClick={onClose} className={css.close}>X</button>
            <form onSubmit={handleSubmit}>
                <Input type='email' value={email} id={'email'} name={'email'} onChange={(e) => setEmail(e.target.value)} label='Email' required/>
                <Input type='password' value={password} id={'password'} name={'password'} onChange={(e) => setPassword(e.target.value)} label='Password' required/>
                <Button type='submit' title='Sign up' className={css.btn} />
            </form>
        </div>
    );
}

export default Modal;