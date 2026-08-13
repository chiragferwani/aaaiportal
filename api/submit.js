export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GOOGLE_SCRIPT_URL =
    process.env.GOOGLE_SHEET_WEBHOOK_URL ||
    "https://script.google.com/a/macros/pccoepune.org/s/AKfycbxhjAcxKpB3OgAJ8lFouSPYAn-QFRtRkFwvVFhA5A6NLRuOcucJFm9zlWRRaTTPc0I/exec";

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { teamName, theme, chatbotUrl, projectName, projectDesc } = body || {};

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const payload = {
      timestamp,
      teamName: teamName || "Team Alpha",
      theme: theme || "Agriculture & Smart Farming",
      chatbotUrl: chatbotUrl || "",
      projectName: projectName || "N/A",
      projectDesc: projectDesc || "N/A",
    };

    // Forward payload securely from Vercel server function to Google Apps Script Web App
    const scriptRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const resultText = await scriptRes.text();

    return res.status(200).json({
      success: true,
      message: "Data successfully recorded to Google Sheet",
      timestamp,
      scriptResult: resultText,
    });
  } catch (err) {
    console.error("Vercel submit function error:", err);
    return res.status(500).json({ error: err.message });
  }
}
