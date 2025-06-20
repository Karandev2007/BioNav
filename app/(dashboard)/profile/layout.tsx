import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | BioNav",
  description: "Your Profile",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 