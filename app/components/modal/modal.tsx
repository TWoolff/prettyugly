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
    const [success, setSuccess] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createCustomer(email, password)
        setSuccess(true)
    }

    return ( 
        <div className={css.modal}>
            <h2>Sign up</h2>
            <button onClick={onClose} className={css.close}>X</button>
            {!success && <form onSubmit={handleSubmit}>
                <Input type='email' value={email} id={'email'} name={'email'} onChange={(e) => setEmail(e.target.value)} label='Email' required/>
                <Input type='password' value={password} id={'password'} name={'password'} onChange={(e) => setPassword(e.target.value)} label='Password' required/>
                <Button type='submit' title='Sign up' className={css.btn} />
            </form>}
            {success && <p>Thank you for signing up! You can now log in.</p>}
        </div>
    );
}

export default Modal;