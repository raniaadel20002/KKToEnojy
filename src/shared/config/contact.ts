export const SITE_CONTACT = {
  // Dummy contact info until client provides final numbers
  phone: "+20 100 000 0000",
  rawPhone: "+201000000000",
  whatsappPhone: "201000000000",
  email: "info@KKToEnojy.com",

  // Dummy social links
  socials: {
    facebook: "https://www.facebook.com/kktoenojy",
    instagram: "https://www.instagram.com/kktoenojy",
    tiktok: "https://www.tiktok.com/@kktoenojy",
    x: "https://x.com/kktoenojy",
  },

  // Site domain & brand identity
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://kktoenjoy.com",
  brandName: "KKToEnojy",
  brandAliases: ["KK To Enjoy", "KKTOENJOY", "KKToEnojy Tours", "KKToEnojy Egypt"],
  addressCountry: "EG",
  addressLocality: "Hurghada / Red Sea, Egypt",
} as const;

