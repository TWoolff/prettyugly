'use client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { TransitionLink } from '@/app/utils/transitionLinks';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import css from './featured.module.css';

type FeaturedProps = {
    data: {
        title: string;
        paragraph: any;
        products: {
            fields: {
                productId: string;
            };
        }[];
        image: {
            fields: {
                description: string;
                file: {
                    url: string;
                };
            };
        };
    };
    hasLoaded: boolean;
    setHasLoaded: (hasLoaded: boolean) => void;
};

const Featured: React.FC<FeaturedProps> = ({ data, hasLoaded, setHasLoaded }) => {
    const { title, paragraph, image, products } = data;
    const { file } = image.fields;
    const productIds = products.map((product) => product.fields.productId);

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    return (
        <motion.div
            className={css.featuredContainer}
            initial={{ rotateX: 180 }}
            animate={hasLoaded ? { rotateX: 0 } : {}} 
            transition={{ duration: 1, ease: [0.4, 0, 0.8, 0] }}
        >
            <motion.div
                className={`${css.featuredFront} grid`}
                style={{ backgroundImage: `url(${file.url})` }}
                initial={{ rotateX: -180 }} 
                animate={{ rotateX: 0 }} 
                transition={{ duration: 1 }}
            >
                <div className={css.content}>
                    <h1>{title}</h1>
                    {documentToReactComponents(paragraph)}
                    <TransitionLink href={'/featured'} filter={productIds} className={css.btn}>
                        Shop Now
                    </TransitionLink>
                </div>
            </motion.div>

            <motion.div
                className={css.featuredBack}
                initial={{ rotateX: 180 }} 
                animate={{ visibility: 'hidden', rotateX: 0 }} 
                transition={{ duration: 0.8 }}
            />
        </motion.div>
    );
};

export default Featured;