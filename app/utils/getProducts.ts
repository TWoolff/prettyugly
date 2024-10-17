'use server'
import Stripe from 'stripe'
import { slugify } from './slugify'

export const getProducts = async (category?: string, language?: string) => {
	const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) ?? '', { apiVersion: '2024-04-10' })
	
	let query = 'active:\'true\''
	if (category) {
			const metadataKey = `metadata['category_${language === 'da-DK' ? 'da' : 'en'}']`
			query += ` AND ${metadataKey}:'${category}'`
	}

	console.log('Search query:', query);

	try {
			const res = await stripe.products.search({
					query,
					limit: 100,
					expand: ['data.default_price']
			})

			console.log('Stripe API response:', JSON.stringify(res, null, 2));

			const products = res.data.map(product => ({
					id: product.id,
					name: product.name,
					description: product.description,
					images: product.images,
					metadata: product.metadata,
					price: product.default_price && typeof product.default_price === 'object' ? product.default_price.unit_amount : null,
					currency: product.default_price && typeof product.default_price === 'object' ? product.default_price.currency : null,
					slug: slugify(product.name),
			}))

			console.log('Processed products:', JSON.stringify(products, null, 2));

			return products
	} catch (error) {
			console.error('Error fetching products:', error)
			return []
	}
}

export const getProductById = async (id: string) => {
	const products = await getProducts()
	return products.find((product: any) => product.id === id) || null
}

export const getProductBySlug = async (slug: string) => {
	const products = await getProducts()
	return products.find((product: any) => product.slug === slug) || null
}
