"use client";
import Link from "next/link";
import { useAppContext } from "@/app/context";
import { useChangeCurrency } from "@/app/utils/useChangeCurrency";
import css from "./product.module.css";

interface ProductProps {
	data: {
		id: string;
		name: string;
		description: string;
		images: string[];
		metadata: {
			[key: string]: string | undefined;
			title_en?: string;
			title_da?: string;
		};
		price: number;
		unit_amount: number | null;
		currency: string | null;
		slug: string;
	};
}

const Product: React.FC<ProductProps> = ({ data }) => {
	const { state } = useAppContext();
	const { language, currency } = state;
	const { getExchangeRate } = useChangeCurrency();

	const languageSuffix = language === "da-DK" ? "_da" : "_en";
	const title = data.metadata[`title${languageSuffix}`] || data.name;

	const getConvertedPrice = (amount: number) => {
		const rate = getExchangeRate(state.currency as "DKK" | "EUR" | "SEK");
		return Math.round(amount * rate);
	};

	const displayPrice = getConvertedPrice(data.price);

	return (
		<Link
			href={`/products/${data.slug}`}
			key={data.id}
			className={css.product}
			style={{ backgroundImage: `url(${data.images[0]})` }}
		>
			<div className={css.text}>
				<h3>{title}</h3>
				{displayPrice && currency && (
					<p>
						{new Intl.NumberFormat(language, {
							style: "currency",
							currency: currency,
						}).format(displayPrice / 100)}
					</p>
				)}
			</div>
		</Link>
	);
};

export default Product;
