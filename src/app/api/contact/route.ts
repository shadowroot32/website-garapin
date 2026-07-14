import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, contact, websiteType, package: pkg, message, lang } = body;

    if (!name || !contact || !websiteType || !pkg) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, this would send email via SMTP or forward to WhatsApp
    // For now, log the submission
    console.log("Contact form submission:", {
      name,
      company,
      contact,
      websiteType,
      package: pkg,
      message,
      lang,
    });

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}