// app/api/webhooks/sanity/route.ts
// Webhook handler for Sanity content updates

import { NextRequest, NextResponse } from "next/server";
import { SyncService } from "@/lib/services/sync.service";
import crypto from "crypto";

/**
 * Verify Sanity webhook signature
 */
function verifySignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");

  return hash === signature;
}

export async function POST(request: NextRequest) {
  console.log("--- Sanity Webhook Received ---");
  try {
    const signature = request.headers.get("sanity-webhook-signature");
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    console.log("Signature present:", !!signature);
    console.log("Secret configured:", !!secret);

    if (!secret) {
      console.error("SANITY_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 },
      );
    }

    // Get raw body for signature verification
    const rawBody = await request.text();

    // Verify signature if present
    if (signature) {
      const isValid = verifySignature(rawBody, signature, secret);
      console.log("Signature valid:", isValid);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 },
        );
      }
    } else {
      console.warn("No signature found in webhook request");
    }

    const payload = JSON.parse(rawBody);
    console.log("Webhook payload:", JSON.stringify(payload, null, 2));

    // Handle different webhook events
    const { _type, _id } = payload;

    if (_type === "apartment") {
      console.log(`Syncing apartment: ${_id}`);
      try {
        // Sync the updated apartment
        const apartment = await SyncService.syncApartment(_id);
        console.log("Apartment synced successfully:", apartment.id);

        return NextResponse.json({
          message: "Apartment synced successfully",
          apartment,
        });
      } catch (syncError: any) {
        console.error("SyncService error:", syncError);
        throw syncError;
      }
    }

    console.log(`Webhook received but not processed for type: ${_type}`);
    return NextResponse.json({
      message: "Webhook received but not processed",
      type: _type,
    });
  } catch (error: any) {
    console.error("Sanity webhook error:", error);

    return NextResponse.json(
      {
        error: "Webhook processing failed",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
