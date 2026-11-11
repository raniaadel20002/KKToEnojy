export const SITE_CONTACT = {
  // Official contact information
  phone: "+20 150 300 6484",
  displayPhone: "01503006484",
  rawPhone: "+201503006484",
  whatsappPhone: "201503006484",
  email: "info@KKToEnojy.com",

  // Official social links
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61575101615934&mibextid=ZbWKwL",
    instagram: "https://www.instagram.com/hurghada_kktoenjoy?srtk=eHBweGZkZGdsa3Jz",
  },

  // Site domain & brand identity
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://kktoenjoy.com",
  brandName: "KKToEnojy",
  brandAliases: ["KK To Enjoy", "KKTOENJOY", "KKToEnojy Tours", "KKToEnojy Egypt"],
  addressCountry: "EG",
  addressLocality: "Hurghada / Red Sea, Egypt",
} as const;
