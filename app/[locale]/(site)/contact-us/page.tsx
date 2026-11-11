import { ContactSection } from "@/src/features/contact/components/contact-section";
import { SITE_CONTACT } from "@/src/shared/config/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with KKToEnojy",
  description:
    `Contact KKToEnojy for inquiries and tour bookings in Egypt. Reach us at ${SITE_CONTACT.email} or via WhatsApp. We're here to help you create memories together.`,
  openGraph: {
    title: "Contact KKToEnojy",
    description: "Get in touch for bookings and inquiries. We're here to help plan your Egyptian adventure.",
  },
};

export default function ContactUsPage() {
  return <ContactSection />;
}
