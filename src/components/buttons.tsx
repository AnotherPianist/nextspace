"use client";

import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading")
    return <>...</>;
  else if (status === "authenticated")
    return (
      <Link href="/dashboard">
        <Image src={session?.user?.image ?? "/mememan.webp"} alt="Your Name" width={32} height={32} />
      </Link>
    );

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}