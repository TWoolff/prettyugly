'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import css from './carousel.module.css';



const Carousel: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);

    return (
        <section ref={targetRef} className={css.carouselContainer}>
            <div className={css.stickyContainer}>
                <motion.div style={{ x }} className={css.motionContainer}>
                    {cards.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const Card: React.FC<{ card: { id: number; url: string; title: string } }> = ({
    card,
}) => {
    return (
        <div className={css.card}>
            <div
                style={{
                    backgroundImage: `url(${card.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className={css.cardBackground}
            ></div>
            <div className={css.cardContent}>
                <p className={css.cardTitle}>{card.title}</p>
            </div>
        </div>
    );
};

export default Carousel;

const cards = [
    {
        url: '/imgs/abstract/1.jpg',
        title: 'Title 1',
        id: 1,
    },
    {
        url: '/imgs/abstract/2.jpg',
        title: 'Title 2',
        id: 2,
    },
    {
        url: '/imgs/abstract/3.jpg',
        title: 'Title 3',
        id: 3,
    },
    {
        url: '/imgs/abstract/4.jpg',
        title: 'Title 4',
        id: 4,
    },
    {
        url: '/imgs/abstract/5.jpg',
        title: 'Title 5',
        id: 5,
    },
    {
        url: '/imgs/abstract/6.jpg',
        title: 'Title 6',
        id: 6,
    },
    {
        url: '/imgs/abstract/7.jpg',
        title: 'Title 7',
        id: 7,
    },
];
