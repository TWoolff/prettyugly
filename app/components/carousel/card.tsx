import { TransitionLink } from "@/app/utils/transitionLinks";
import css from './carousel.module.css';

export type CardProps = {
    slug?: string;
    unit_amount: number;
    product: {
        id: number;
        name: string;
        images: string[];
        description: string;
    };
};

const Card: React.FC<CardProps> = ({ slug, unit_amount, product  }) => {
    return (
        <TransitionLink href={`products/${slug ?? ''}`} className={css.card}>
            <div className={css.cardBackground} style={{backgroundImage: `url(${product.images[0]})`}} />
            <div className={css.cardContent}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{unit_amount / 100},00 kr.</p>
            </div>
        </TransitionLink>
    );
};

export default Card;