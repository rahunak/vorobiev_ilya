import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message } = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram credentials not configured");
      return NextResponse.json(
        { error: "Telegram not configured" },
        { status: 500 }
      );
    }

    const text = `🔔 Новая заявка с сайта!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}${message ? `\n💬 Сообщение: ${message}` : ""}`;

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Telegram API error:", error);
      console.error("Response status:", response.status);
      console.error("Bot token (first 10 chars):", botToken?.substring(0, 10));
      console.error("Chat ID:", chatId);
      return NextResponse.json(
        { error: "Failed to send message", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending telegram message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
