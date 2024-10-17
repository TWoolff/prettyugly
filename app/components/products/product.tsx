"use client";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/app/types";
import { useAppContext } from "@/app/context";
import css from "./product.module.css";

const Product: React.FC<ProductType> = ({ data }) => {
  const { state } = useAppContext();
  const { language } = state;
  const { id, slug, unit_amount, currency } = data;
  const { name, images, metadata } = data.product;

  return (
    <div className={css.product}>
      <Link key={id} href={`/products/${slug}`}>
        <Image
          src={images[0]}
          alt={name}
          className={css.mainImg}
          width={500}
          height={500}
          quality={90}
        />
        <div className={css.text}>
          <h2>{language === 'da-DK' ? metadata.title_da : metadata.title_en}</h2>
          <p>
            {unit_amount / 100} {currency.toUpperCase()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
