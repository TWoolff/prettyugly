import { NextResponse } from 'next/server'

const INSTAGRAM_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN

export async function GET() {
  if (!INSTAGRAM_TOKEN) {
    console.error('Instagram access token is not defined')
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${INSTAGRAM_TOKEN}`
    )
    
    if (!response.ok) {
      throw new Error(`Instagram API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data.data)
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return NextResponse.json({ error: 'Error fetching Instagram posts' }, { status: 500 })
  }
} 