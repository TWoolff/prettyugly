"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context";
import css from "./instagram.module.css";
import { InstagramIcon } from "../icons/icons";

interface InstagramPost {
	id: string;
	media_url: string;
	permalink: string;
	caption: string;
	media_type: string;
}

const Instagram = () => {
	const { state } = useAppContext();
	const { language } = state;
	const [posts, setPosts] = useState<InstagramPost[]>([]);

	useEffect(() => {
		const fetchInstagramPosts = async () => {
			try {
				const response = await fetch("/api/instagram");
				const data = await response.json();
				setPosts(data.slice(0, 4));
			} catch (error) {
				console.error("Error fetching Instagram posts:", error);
			}
		};

		fetchInstagramPosts();
	}, []);

	return (
		<section className={`${css.instagram}`}>
			<div className={css.content}>
				<h2>
					{language === "en-US"
						? "Follow us on Instagram"
						: "Følg os på Instagram"}
				</h2>
				<InstagramIcon />
			</div>
			<div className={css.grid}>
				{posts.map((post) => (
					<a
						key={post.id}
						href={post.permalink}
						target="_blank"
						rel="noopener noreferrer"
						className={css.post}
					>
						<Image
							src={post.media_url}
							alt={post.caption || "Instagram post"}
							width={476}
							height={476}
							className={css.image}
						/>
					</a>
				))}
			</div>
		</section>
	);
};

export default Instagram;
