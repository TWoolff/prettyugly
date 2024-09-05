'use client'
import { useEffect, useRef } from 'react'
import css from './bigtext.module.css'

export type BigTextProps = {
  text: string
  className?: string
  onInViewChange: (inView: boolean) => void
};

const BigText: React.FC<BigTextProps> = ({text, className, onInViewChange}) => {
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            onInViewChange(entry.isIntersecting);
        },
        {threshold: 0.3}
    );

    if (bigTextRef.current) {
        observer.observe(bigTextRef.current);
    }

    return () => {
        if (bigTextRef.current) {
            observer.unobserve(bigTextRef.current);
        }
    };
}, [onInViewChange]);

  return ( 
    <section ref={bigTextRef} className={`${css.bigtext} ${className}`}>
      <h2>{text}</h2>
    </section>
  );
}

export default BigText;