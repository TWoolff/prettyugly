'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef, useMemo, JSX } from 'react';
import { useAppContext } from '@/app/context';
import Card, { CardProps } from './card';
import css from './carousel.module.css';

type CarouselProps = {
    data: any
} 

const Carousel: React.FC<CarouselProps> = ({ data }) => {
    const { state } = useAppContext();
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const productIds = useMemo(() => data.fields.products.map((p: any) => p.fields.productId), [data]);
    const filteredProducts = useMemo(() => {
        return state.data?.filter((product: any) => productIds.includes(product.product.id)) || [];
    }, [state.data, productIds]);

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-95%']);

    return (
        <section ref={targetRef} className={css.carouselContainer}>
            <div className={css.stickyContainer}>
                <motion.div style={{ x }} className={css.motionContainer}>
                    {filteredProducts.map((product: JSX.IntrinsicAttributes & CardProps) => {
                        return <Card key={product.product.id} {...product} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Carousel;
