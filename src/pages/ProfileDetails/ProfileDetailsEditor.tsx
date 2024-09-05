import ProfileImageEditor from "./ProfileImageEditor.tsx";
import ProfileUserInfo from "./ProfileUserInfo.tsx";
import { useUserContext } from "../../context/UserProvider.tsx";
import saved from "../../assets/icon-changes-saved.svg";
import { useNotificationContext } from "../../context/NotificationProvider.tsx";

export default function ProfileDetailsEditor() {
  const {
    user,
    setName,
    setLastName,
    setEmail,
    setImage,
    syncFirebaseUserWithLocalUser,
  } = useUserContext();
  const { setNotification } = useNotificationContext();

  if (!user) return null;

  const { profileUrl, firstName, lastName, email } = user;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl text-dark font-semibold">Profile Details</div>
      <div className="text-sm text-dark-med">
        Add your details to create a personal touch to your profile.
      </div>
      <ProfileImageEditor
        profileUrl={profileUrl}
        onImageChange={(file) => {
          setImage(file, true);
        }}
      />
      <ProfileUserInfo
        onNameChange={(e) => {
          setName(e.target.value);
        }}
        firstName={firstName}
        onLastNameChange={(e) => {
          setLastName(e.target.value);
        }}
        lastName={lastName}
        onEmailChange={(e) => {
          setEmail(e.target.value);
        }}
        email={email}
      />
      <div className="flex justify-end mt-5">
        <button
          onClick={() => {
            syncFirebaseUserWithLocalUser();
            setNotification({
              icon: saved,
              label: "Your changes were saved!",
              isDisplayed: true,
            });
          }}
          className="bg-purple-light hover:bg-purple-med text-purple font-semibold py-2 px-5 rounded-lg w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}
