export const navItems = [
  { label: "Home", labelKey: "home", href: "/", hasMenu: false },
  {
    label: "Destinations",
    labelKey: "destinations",
    href: "/Destinations",
    hasMenu: true,
  },
  { label: "Trips", labelKey: "trips", href: "/trips", hasMenu: false },
  { label: "Gallery", labelKey: "gallery", href: "/gallery", hasMenu: false },
  { label: "Blogs", labelKey: "blogs", href: "/blogs", hasMenu: false },
  { label: "About Us", labelKey: "about", href: "/About", hasMenu: false },
  {
    label: "Contact Us",
    labelKey: "contact",
    href: "/contact-us",
    hasMenu: false,
  },
] as const;
