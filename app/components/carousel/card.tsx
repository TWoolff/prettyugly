import { TransitionLink } from "@/app/utils/transitionLinks";
import css from './carousel.module.css';

export type CardProps = {
    id: number;
    slug?: string;
    unit_amount: number;
    product: {
        id: number;
        name: string;
        images: string[];
        description: string;
    };
};

const Card: React.FC<CardProps> = ({ slug, unit_amount, product: {id, name, images, description} }) => {
    return (
        <TransitionLink href={`products/${slug ?? ''}`} className={css.card}>
            <div className={css.cardBackground} style={{backgroundImage: `url(${images[0]})`}} />
            <div className={css.cardContent}>
                <p className={css.cardTitle}>{name}</p>
            </div>
        </TransitionLink>
    );
};

export default Card;