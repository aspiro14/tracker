"use client";
import React from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
const LoginButton = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user)
  if (session)
     return (
      <div className="flex ">
        <div>
          <div>
            <Image
              src={user?.image || "/default-avatar.png"}
              alt={user?.name || "krishna"}
              width={96}
              height={96}
              className="object-cover rounded-sm"
            />
          </div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
        </div>
        <button onClick={() => signOut()}>logout</button>
      </div>
    );
  return <button onClick={() => signIn()}>login</button>;
};

export default LoginButton;
