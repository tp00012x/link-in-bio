import { useUserContext } from "../context/UserProvider.tsx";
import blankProfile from "../assets/blank-profile.webp";

export default function LinksProfilePicture() {
  const { user } = useUserContext();

  if (!user) {
    return null;
  }

  const { profileUrl } = user;

  return (
    <img
      className="object-cover rounded-full bg-gray-100 w-28 h-28"
      src={profileUrl || blankProfile}
      alt="profileImg"
    />
  );
}
