import { useAppContext } from '../context';

export const useChangeCurrency = () => {
    const { state, dispatch } = useAppContext();
    const { data, exchangeRate } = state;

    const changeCurrency = (currency: 'DKK' | 'EUR' | 'SEK') => {
        const getExchangeRate = (currency: 'DKK' | 'EUR' | 'SEK') => {
            switch (currency) {
                case 'EUR':
                    return exchangeRate?.EUR;
                case 'SEK':
                    return exchangeRate?.SEK;
                default:
                    return 1;
            }
        };

        const updatedProducts = data.map((product: { original_unit_amount: number; unit_amount: number }) => {
            const originalUnitAmount = product.original_unit_amount || product.unit_amount;
            const updatedUnitAmount = Math.round(originalUnitAmount * Number(getExchangeRate(currency)));

            return {
                ...product,
                unit_amount: updatedUnitAmount,
                original_unit_amount: originalUnitAmount,
                currency,
            };
        });

        //@ts-ignore
        dispatch({ type: 'SET_CURRENCY', payload: currency });
        dispatch({ type: 'UPDATE_PRODUCTS', payload: updatedProducts });
    };

    return { changeCurrency };
};
