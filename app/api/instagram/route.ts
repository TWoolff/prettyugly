import { NextResponse } from "next/server";

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export async function GET() {
	if (!INSTAGRAM_TOKEN) {
		console.error("Instagram access token is not defined");
		return NextResponse.json({ error: "Configuration error" }, { status: 500 });
	}

	try {
		const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${INSTAGRAM_TOKEN}`;
		console.log("Attempting to fetch from:", url);

		const response = await fetch(url);

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Instagram API error details:", {
				status: response.status,
				statusText: response.statusText,
				error: errorData,
			});
			throw new Error(`Instagram API error: ${JSON.stringify(errorData)}`);
		}

		const data = await response.json();
		return NextResponse.json(data.data);
	} catch (error) {
		console.error("Detailed error:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Unknown error" },
			{ status: 500 },
		);
	}
}
