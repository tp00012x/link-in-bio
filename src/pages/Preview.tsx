import Links from "../components/Links.tsx";
import clipboard from "../assets/icon-link-copied-to-clipboard.svg";
import { useNotificationContext } from "../context/NotificationProvider.tsx";
import useAppNavigation from "../hooks/useAppNavigation.ts";
import LinksProfilePicture from "../components/LinksProfilePicture.tsx";
import LinksInformation from "../components/LinksInformation.tsx";

function PreviewNavigation() {
  const { setNotification } = useNotificationContext();

  const { navigateHome } = useAppNavigation();

  async function copyLink() {
    const currentURL = window.location.href;
    await navigator.clipboard.writeText(currentURL);
  }

  return (
    <div className="flex justify-between w-full p-5 rounded-lg bg-dark-lighter">
      <button
        onClick={() => {
          navigateHome();
        }}
        className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg"
      >
        Back to Editor
      </button>
      <button
        onClick={() => {
          copyLink();
          setNotification({
            icon: clipboard,
            label: "This link has been copied to your clipboard!",
            isDisplayed: true,
          });
        }}
        className="relative bg-purple text-white hover:bg-purple-light hover:text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg"
      >
        Share Link
      </button>
    </div>
  );
}

export default function Preview() {
  return (
    <div className="relative flex flex-col">
      <div className="h-screen relative">
        <div className="flex flex-col items-center bg-purple h-96 rounded-b-3xl p-5">
          <PreviewNavigation />
          <div className="absolute flex justify-center mt-40 items-center bg-white h-[620px] w-[349px] rounded-3xl shadow-2xl p-9">
            <div className="flex flex-col items-center w-full">
              <LinksProfilePicture />
              <LinksInformation />
              <Links />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
