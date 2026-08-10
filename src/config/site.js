// Get site URL from environment variable, use default value if not set
// Note: Please set the correct PUBLIC_SITE_URL in .env file after first deployment
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://aiodyssey.dev';

export const siteConfig = {
	title: "AI Odyssey presents: The LLM Design Workshop",
	author: "AI Odyssey",
	url: SITE_URL,
	mail: "hackathon@aiodyssey.dev",
	utm: {
		source: `${SITE_URL}`,
		medium: "referral",
		campaign: "navigation",
	},
	meta:{
		title: "AI Odyssey presents: The LLM Design Workshop — Day 4 RAG Hackathon",
		description: "AI Odyssey presents: The LLM Design Workshop. 4 Hours. 5 Themes. 25 Teams. One RAG Challenge. Build a working RAG-powered chatbot.",
		keywords: "AI Odyssey, LLM Design Workshop, RAG hackathon, retrieval augmented generation, chatbot challenge, vector search",
		image: `${SITE_URL}/og.jpg`,
		twitterHandle: "",
	},
	social:{
		twitter: "",
		twitterName: "",
		github: "",
		blog: "",
	},
};

// Footer
export const socialLinks = [];
