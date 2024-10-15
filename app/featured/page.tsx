"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../context";
import Product from "../components/products/product";
import css from "./featured.module.css";

const Featured: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { filters } = state;

  useEffect(() => {
    dispatch({ type: "SET_FILTER", payload: { key: "color", value: "" } });
    dispatch({ type: "SET_FILTER", payload: { key: "category", value: "" } });
  }, []);

  const filteredProducts = state.data?.filter((product: {product: {id: string; name: string; metadata: { [key: string]: string }}}) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === "") return true;
        if (key === "featured") {
          const featuredIds = value.split(",");
          return featuredIds.includes(product.product.id);
        }
        return product.product.metadata[key] === value;
      });
    }
  );

  return (
    <section className={css.featured}>
      <h1>Featured</h1>
      <div className={css.products}>
        <AnimatePresence>
          {filteredProducts?.map(
            (product: {
              id: string;
              slug: string;
              unit_amount?: number;
              product?: {
                active: boolean;
                created: number;
                default_price: string;
                images: string[];
                marketing_features: string[];
                metadata: { [key: string]: string };
                id: string;
                name: string;
                description: string;
                productInfo: string;
              };
            }) => (
              <motion.div key={product.id} layout>
                <Product
                  key={product.id}
                  data={{
                    currency: "",
                    ...product,
                    unit_amount: product.unit_amount || 0,
                    product: product.product || {
                      active: false,
                      created: 0,
                      default_price: "",
                      images: [],
                      marketing_features: [],
                      metadata: {},
                      id: "",
                      name: "",
                      description: "",
                      productInfo: "",
                    },
                  }}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Featured;
