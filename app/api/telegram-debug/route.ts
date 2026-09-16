import { NextResponse } from "next/server";

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return NextResponse.json({ error: "Bot token not configured" });
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates`
    );
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
