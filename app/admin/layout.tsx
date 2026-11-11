import type { Metadata } from "next";
import { AdminShell } from "@/src/features/admin/layout/admin-shell";

export const metadata: Metadata = {
  title: "Admin | KKToEnojy",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
