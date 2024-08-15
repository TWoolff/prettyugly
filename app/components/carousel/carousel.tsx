'use client';
import { useRef, useMemo } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useAppContext } from '@/app/context';
import { TransitionLink } from "@/app/utils/transitionLinks";
import Card, { CardProps } from './card';
import css from './carousel.module.css';
import Logo from '../logo/logo';

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
                    {filteredProducts.map((product: typeof TransitionLink & CardProps) => {
                        return <Card key={product.product.id} {...product} />;
                    })}
                </motion.div>
                <article className={css.scrollText}>
                    <Logo />
                    <div>
                        <h2>Introduction to PrettyUgly</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lectus augue, accumsan non vestibulum sed, varius ut velit. Suspendisse potenti. Quisque fringilla ornare est, et elementum justo venenatis eget. Sed mi risus, varius sit amet pharetra nec, consectetur at justo. Proin scelerisque lacus id fringilla gravida. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec tempus malesuada nunc vitae imperdiet. Quisque sodales turpis vitae feugiat blandit.</p>
                        <p>Praesent semper ipsum turpis, vel tincidunt velit tristique sit amet. Proin laoreet, nibh sit amet aliquet sodales, odio lacus egestas quam, et condimentum turpis arcu eu dolor. Cras malesuada ipsum nisl, vitae eleifend mi mollis id. Nam blandit id dolor hendrerit vehicula. Sed metus eros, hendrerit eget placerat nec, malesuada id diam. Cras non lorem condimentum, convallis mi eu, consequat orci. Integer lectus neque, tristique non arcu nec, dignissim suscipit velit. Sed mi est, blandit sit amet tellus id, consequat pretium.</p>
                        <TransitionLink href='products/'>
                            Click here to see our full catalogue
                        </TransitionLink>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Carousel;
