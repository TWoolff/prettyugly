'use server'
export const getExchangeRate = async () => {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE}/latest/DKK`);
    const data = await response.json();
    return data.conversion_rates;
}