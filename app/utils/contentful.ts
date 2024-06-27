'use server'
import * as contentful from 'contentful'

const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? ''
})

export const getPage = async (slug: string) => {
    const page = await client.getEntries({
        content_type: 'page',
        include: 3,
        'fields.slug': slug
    })
    return page
}