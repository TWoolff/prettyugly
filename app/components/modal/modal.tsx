'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createCustomer } from '@/app/utils/crudCustomer';
import Button from '../formelements/button';
import Input from '../formelements/input';
import css from './modal.module.css';

type ModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCustomer(email, password);
        setSuccess(true);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className={css.modalOverlay}
                >
                    <motion.div
                        initial={{ scale: 0}}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0}}
                        onClick={(e) => e.stopPropagation()}
                        className={css.modalContent}
                    >
                        <div className={css.modalInner}>
                            <h3 className={css.modalTitle}>Sign up</h3>
                                {!success && (
                                    <form onSubmit={handleSubmit} className={css.modalText}>
                                        <Input
                                            type='email'
                                            value={email}
                                            id={'email'}
                                            name={'email'}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            label='Email'
                                            required
                                        />
                                        <Input
                                            type='password'
                                            value={password}
                                            id={'password'}
                                            name={'password'}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            label='Password'
                                            required
                                        />
                                        <Button type='submit' title='Sign up' className={css.btn} />
                                    </form>
                                )}
                                {success && ( <p>Thank you for signing up! You can now log in.</p>)}
                            <Button onClick={() => setIsOpen(false)} className={css.close} title={'close'} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;