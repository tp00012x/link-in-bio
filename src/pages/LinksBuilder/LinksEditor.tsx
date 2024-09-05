import empty from "../../assets/illustration-empty.svg";
import { LinkEditor } from "./LinkEditor.tsx";
import { useLinksContext } from "../../context/LinksProvider.tsx";
import { useState } from "react";
import { PLATFORM_INFO } from "./PLATFORM_INFO.ts";
import saved from "../../assets/icon-changes-saved.svg";
import { useNotificationContext } from "../../context/NotificationProvider.tsx";

export function LinksEditor() {
  const {
    links,
    addNewLink,
    removeLink,
    setLinkPlatform,
    setLinkUrl,
    syncFirebaseLinksWithLocalLinks,
  } = useLinksContext();
  const { setNotification } = useNotificationContext();

  const [isError, setIsError] = useState(false);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="text-xl text-dark font-semibold">
        Customize your links
      </div>
      <div className="text-sm text-dark-med py-4">
        Add/edit/remove links below and them share all your profiles with the
        world!
      </div>
      <button
        onClick={addNewLink}
        className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 w-full border border-purple hover:border-transparent rounded-xl"
      >
        + Add new link
      </button>
      {links.length > 0 ? (
        <div className="my-5">
          {links.map((link, index) => {
            return (
              <LinkEditor
                isError={isError}
                key={index}
                selectedDropdownOption={
                  link.platform ? PLATFORM_INFO[link.platform].label : "Options"
                }
                url={link.url}
                linkNumber={index + 1}
                onRemoveClick={() => {
                  removeLink(index, true);
                }}
                onAddPlatformClick={(platform) => {
                  setLinkPlatform(platform, index);
                }}
                onUrlChange={(e) => {
                  setLinkUrl(e.target.value, index);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center h-80 justify-center bg-dark-lighter mt-7 rounded-xl">
          <img src={empty} alt="empty" />
        </div>
      )}
      <div className="flex justify-end mt-5">
        <button
          onClick={() => {
            const anyUrlIsEmpty = links.some((link) => {
              return link.url === "";
            });
            if (anyUrlIsEmpty) {
              setIsError(true);
              return;
            }
            syncFirebaseLinksWithLocalLinks();
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
