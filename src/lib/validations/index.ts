import { z } from "zod";

// ---- Auth ----
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Enter your full name").max(100),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

// ---- Membership ----
export const membershipSchema = z.object({
  tier: z.enum(["standard", "premium", "vip"]),
});

// ---- Contact Form ----
export const contactSchema = z.object({
  full_name: z.string().min(2, "Enter your full name").max(100),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum([
    "membership",
    "merchandise",
    "travel",
    "media",
    "partnership",
    "general",
  ]),
  message: z
    .string()
    .min(10, "Message is too short")
    .max(2000, "Message is too long"),
});

// ---- Shop / Checkout ----
export const shippingAddressSchema = z.object({
  full_name: z.string().min(2, "Enter recipient full name"),
  address: z.string().min(5, "Enter a full delivery address"),
  city: z.string().min(2, "Enter city"),
  state: z.string().min(2, "Enter state"),
  phone: z
    .string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number"),
});

export const checkoutSchema = z.object({
  shipping_address: shippingAddressSchema,
  email: z.string().email("Enter a valid email address"),
});

// ---- Profile Update ----
export const profileUpdateSchema = z.object({
  full_name: z.string().min(2, "Enter your full name").max(100),
  phone: z
    .string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number")
    .optional()
    .or(z.literal("")),
});

// ---- Newsletter ----
export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

// Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
