import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context';
import css from './loader.module.css';

const Loader = () => {
  const { state } = useAppContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (!state.hasLoaded) {
          if (prevProgress < 99) {
            return prevProgress + 1;
          } else {
            return prevProgress;
          }
        } else {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(interval);
            return prevProgress;
          }
        }
      });
    }, 5);

    return () => clearInterval(interval);
  }, [state.hasLoaded]);
  
  return (
    <motion.div className={css.loader}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: -2000 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.29 20.19" >
        <path d="M0,.23h6.32c3.72,0,7.9,2,7.9,6.71s-4.17,6.71-7.9,6.71h-2.03v6.32H0V.23ZM6.32,9.78c2.79,0,3.55-1.55,3.55-2.85s-.76-2.88-3.55-2.88h-2.03v5.72h2.03Z" />
        <path d="M16.75.23h6.99c3.13,0,7.22,1.78,7.22,6.48,0,3.86-2.65,5.55-5.33,6.06l7.39,7.19h-5.89l-6.09-6.74v6.74h-4.29V.23ZM23.51,9.33c2.2,0,3.13-1.32,3.13-2.62s-.93-2.65-3.13-2.65h-2.48v5.27h2.48Z" />
        <path d="M34.42.23h11.79v3.83h-7.5v3.89h6.82v3.83h-6.82v4.34h7.73v3.83h-12.01V.23Z" />
        <path d="M54.02,4.06h-5.33V.23h14.94v3.83h-5.33v15.9h-4.29V4.06Z" />
        <path d="M70.65,4.06h-5.33V.23h14.94v3.83h-5.33v15.9h-4.29V4.06Z" />
        <path d="M88.83,10.8L81.67.23h5.24l4.06,6.8L95.03.23h5.27l-7.19,10.57v9.16h-4.29v-9.16Z" />
        <path d="M102,11.33V.23h4.29v10.88c0,2.79,1.21,4.79,4.23,4.79s4.23-2,4.23-4.79V.23h4.29v11.11c0,5.56-3.33,8.85-8.51,8.85s-8.52-3.3-8.52-8.85Z" />
        <path d="M121.84,10.09c0-5.64,4.34-10.09,9.95-10.09,3.72,0,6.99,1.95,8.77,4.93l-3.72,2.14c-1.01-1.69-2.9-2.79-5.05-2.79-3.24,0-5.67,2.54-5.67,5.81s2.65,5.81,5.89,5.81c2.79,0,4.57-1.55,5.22-4.09h-6.4v-3.61h10.97v1.21c0,6.4-3.98,10.77-9.78,10.77s-10.18-4.48-10.18-10.09Z" />
        <path d="M144.62.23h4.29v15.9h7.73v3.83h-12.01V.23Z" />
        <path d="M161.82,10.8L154.66.23h5.24l4.06,6.8,4.06-6.8h5.27l-7.19,10.57v9.16h-4.29v-9.16Z" />
      </svg>
      <h2 className={css.progress}>{progress}%</h2>
    </motion.div>
  )
}
export default Loader