import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import FollowButton from "@/components/FollowButton/FollowButton";

interface Props {
  params: {
    id: string
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `${user?.name}'s user profile` };
}

export default async function UserProfile({ params }: Props){
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, bio, image } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>
      <img src={image ?? "/mememan.webp"} alt={`${name}'s profile'`} />
      <h3>Bio</h3>
      <p>{bio}</p>
      <FollowButton targetUserId={params.id} />
    </div>
  );
}
