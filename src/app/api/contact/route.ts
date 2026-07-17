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
    // Now we save it to Firestore Inbox
    const { collection, addDoc, serverTimestamp } = require("firebase/firestore");
    const { db } = require("@/lib/firebase/config");

    await addDoc(collection(db, "inbox"), {
      name,
      company: company || "",
      contact,
      websiteType,
      package: pkg,
      message: message || "",
      lang,
      createdAt: serverTimestamp(),
      read: false,
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