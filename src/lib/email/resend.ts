import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "ANFASSC <onboarding@resend.dev>";

export async function sendWelcomeEmail(to: string, fullName: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: "Welcome to ANFASSC!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: #003d24; padding: 32px; text-align: center;">
            <h1 style="color: #D4AF37; font-size: 20px; margin: 0;">ANFASSC</h1>
            <p style="color: #fff; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin: 4px 0 0;">Authentic Nigeria Football & Allied Sports Supporters Club</p>
          </div>
          <div style="padding: 32px; background: #fff;">
            <h2 style="color: #0A0A0A; font-size: 22px;">Welcome, ${fullName}! 🇳🇬</h2>
            <p style="color: #444; line-height: 1.6;">
              Thank you for joining ANFASSC — Nigeria's official, CAF-recognised and FIFA-endorsed football supporters club.
              Your account has been created successfully.
            </p>
            <p style="color: #444; line-height: 1.6;">
              Visit your member dashboard to complete your membership and get your official digital card.
            </p>
            <a href="https://anfassc-tau.vercel.app/dashboard" style="display: inline-block; background: #008751; color: #fff; padding: 12px 28px; text-decoration: none; border-radius: 4px; margin-top: 16px; font-weight: bold;">
              Go to Dashboard
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #999;">
            ANFASSC · 96 Ogunlana Drive, Surulere, Lagos, Nigeria
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export async function sendMembershipConfirmationEmail(to: string, fullName: string, tier: string, membershipNumber: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: "Your ANFASSC Membership is Active!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: #003d24; padding: 32px; text-align: center;">
            <h1 style="color: #D4AF37; font-size: 20px; margin: 0;">ANFASSC</h1>
          </div>
          <div style="padding: 32px; background: #fff;">
            <h2 style="color: #0A0A0A;">Membership Confirmed! ✅</h2>
            <p style="color: #444; line-height: 1.6;">
              Hi ${fullName}, your <strong>${tier.toUpperCase()}</strong> membership is now active.
            </p>
            <div style="background: #003d24; color: #fff; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0; font-size: 11px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px;">Membership Number</p>
              <p style="margin: 4px 0 0; font-size: 18px; font-weight: bold;">${membershipNumber}</p>
            </div>
            <a href="https://anfassc-tau.vercel.app/membership-card" style="display: inline-block; background: #008751; color: #fff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              View Your Card
            </a>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send membership email:", error);
  }
}

export async function sendOrderConfirmationEmail(to: string, fullName: string, orderTotal: number, items: { product_name: string; quantity: number }[]) {
  try {
    const itemsHtml = items.map((i) => `<li>${i.product_name} × ${i.quantity}</li>`).join("");
    await resend.emails.send({
      from: FROM,
      to,
      subject: "Your ANFASSC Order is Confirmed",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: #003d24; padding: 32px; text-align: center;">
            <h1 style="color: #D4AF37; font-size: 20px; margin: 0;">ANFASSC</h1>
          </div>
          <div style="padding: 32px; background: #fff;">
            <h2 style="color: #0A0A0A;">Order Confirmed! 🛍️</h2>
            <p style="color: #444; line-height: 1.6;">Hi ${fullName}, thanks for your purchase.</p>
            <ul style="color: #444; line-height: 1.8;">${itemsHtml}</ul>
            <p style="font-size: 18px; font-weight: bold; color: #008751;">Total: ₦${(orderTotal / 100).toLocaleString()}</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send order email:", error);
  }
}