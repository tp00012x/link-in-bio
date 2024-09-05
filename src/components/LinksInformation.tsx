import { useUserContext } from "../context/UserProvider.tsx";

export default function LinksInformation() {
  const { user } = useUserContext();

  if (!user) {
    return null;
  }

  const { firstName, lastName, email } = user;

  return (
    <div>
      <div className="flex flex-col items-center gap-2 my-6">
        <div className="flex gap-1 font-medium">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        <span className="text-sm text-dark-med">{email}</span>
      </div>
    </div>
  );
}
