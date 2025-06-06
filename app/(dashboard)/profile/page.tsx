"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <UserProfile />
    </div>
  );
} 