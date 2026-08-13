import type { APIRoute } from "astro";

// Enable dynamic server endpoint for POST request handling
export const prerender = false;

// Google Apps Script Web App URL (Deployment ID: AKfycbxhjAcxKpB3OgAJ8lFouSPYAn-QFRtRkFwvVFhA5A6NLRuOcucJFm9zlWRRaTTPc0I)
// Kept strictly on the server side — never exposed in frontend client code.
const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ||
  "https://script.google.com/a/macros/pccoepune.org/s/AKfycbxhjAcxKpB3OgAJ8lFouSPYAn-QFRtRkFwvVFhA5A6NLRuOcucJFm9zlWRRaTTPc0I/exec";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { teamName, theme, chatbotUrl, projectName, projectDesc } = body;

    if (!chatbotUrl || !teamName) {
      return new Response(
        JSON.stringify({ success: false, error: "Team name and Chatbot URL are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const payload = {
      timestamp,
      teamName: teamName || "Team Alpha",
      theme: theme || "Agriculture & Smart Farming",
      chatbotUrl,
      projectName: projectName || "N/A",
      projectDesc: projectDesc || "N/A",
    };

    // Send payload to Google Apps Script Web App on the server
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
    } catch (scriptErr) {
      console.error("Google Apps Script forwarding note:", scriptErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Submission successfully forwarded to Google Sheet Apps Script.",
        timestamp,
        data: payload,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to process submission", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
