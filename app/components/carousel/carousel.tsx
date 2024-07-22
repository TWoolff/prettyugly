'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Card, { CardProps } from './card';
import { DataState } from '../../types';
import css from './carousel.module.css';

type carouselProps = {
    data: DataState
} 

const Carousel: React.FC<carouselProps> = ({data}) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);

    return (
        <section ref={targetRef} className={css.carouselContainer}>
            <div className={css.stickyContainer}>
                <motion.div style={{ x }} className={css.motionContainer}>
                    {data?.map((card: CardProps) => {
                        return <Card key={card.product.id} {...card} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Carousel;
