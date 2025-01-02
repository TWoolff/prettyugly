import { NextResponse } from 'next/server'

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN

export async function GET() {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${INSTAGRAM_TOKEN}`
    )
    const data = await response.json()

    return NextResponse.json(data.data)
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return NextResponse.json({ error: 'Error fetching Instagram posts' }, { status: 500 })
  }
} 