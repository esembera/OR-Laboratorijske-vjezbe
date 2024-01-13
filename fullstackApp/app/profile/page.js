"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import NavigationTrack from "../components/navigationTrack";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function ProfileClient({ user }) {
  const { error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="container w-full mx-auto">
      <NavigationTrack />
      <div className="flex flex-col justify-start mt-20 gap-4">
        <h2 className="text-4xl font-bold">Korisnički profil</h2>
        <p className="font-bold">
          Profilna slika:
          <img src={user.picture} alt={user.name} className="w-1/5" />
        </p>
        <p>
          <span className="font-bold">Korisničko ime: </span>
          {user.name}
        </p>
        <p>
          <span className="font-bold">E-mail:</span> {user.email}
        </p>
      </div>
    </div>
  );
});
