import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import LogoutButton from "../_components/common/button/LogoutButton";
import Image from "next/image";
import MainLayout from "../_components/global/MainLayout";
import { User2 as EmptyProfile } from "lucide-react";

type Props = {};

export default async function Profile({}: Props) {
  const session = await getServerSession(authConfig);

  console.log(session);
  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <MainLayout>
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
    </MainLayout>
  );
}
