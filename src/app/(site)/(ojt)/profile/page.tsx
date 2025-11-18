import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Image from "next/image";
import { User2 as EmptyProfile } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import LogoutButton from "@/components/common/button/LogoutButton";

export default async function Profile() {
  const session = await getServerSession(authConfig);
  return (
    <MainLayout>
      {session ? (
        <>
          <div>
            {session.user?.image ? (
              <Image
                src={session.user?.image}
                alt="Profile Picture"
                width={100}
                height={100}
              />
            ) : (
              <EmptyProfile className="w-24 h-24 text-gray-400" />
            )}

            <p>
              Hello, {session?.user?.name}
              <br />
              Email: {session?.user?.email}
            </p>
          </div>
          <LogoutButton />
        </>
      ) : (
        <p>You must be logged in to view this page.</p>
      )}
    </MainLayout>
  );
}
