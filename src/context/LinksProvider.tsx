import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPlatform } from "../pages/LinksBuilder/SOCIAL_MEDIA_PLATFORMS.ts";
import {
  getFirebaseLinksDocument,
  updateFirebaseLinkDocument,
} from "../firebase/firebase.tsx";
import { useUserContext } from "./UserProvider.tsx";

export interface ILink {
  platform: IPlatform | null;
  url: string;
}

export const LinksContext = createContext<{
  links: ILink[];
  setLinks: React.Dispatch<React.SetStateAction<ILink[]>>;
  addNewLink: () => void;
  removeLink: (index: number, upload?: boolean) => void;
  setLinkPlatform: (
    platform: IPlatform,
    index: number,
    upload?: boolean
  ) => void;
  setLinkUrl: (url: string, index: number, upload?: boolean) => void;
  syncFirebaseLinksWithLocalLinks: () => void;
}>({
  links: [],
  setLinks: () => {},
  addNewLink: () => {},
  removeLink: () => {},
  setLinkPlatform: () => {},
  setLinkUrl: () => {},
  syncFirebaseLinksWithLocalLinks: () => {},
});

export default function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<ILink[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    async function loadFirebaseLinks() {
      if (!user) return;
      const data = await getFirebaseLinksDocument(user?.uid);
      setLinks(data?.links || []);
    }
    loadFirebaseLinks();
  }, [user, user?.uid]);

  function addNewLink() {
    setLinks([...links, { platform: null, url: "" }]);
  }

  function removeLink(index: number, upload = false) {
    if (!user) return;

    const linksCopy = [...links];
    linksCopy.splice(index, 1);
    setLinks(linksCopy);

    if (upload) {
      updateFirebaseLinkDocument(user.uid, { links: linksCopy });
    }
  }

  function setLinkPlatform(platform: IPlatform, index: number, upload = false) {
    if (!user) return;

    const linksCopy = [...links];
    linksCopy[index].platform = platform;
    setLinks(linksCopy);

    if (upload) {
      updateFirebaseLinkDocument(user.uid, { links: linksCopy });
    }
  }

  function setLinkUrl(url: string, index: number, upload = false) {
    if (!user) return;

    const linksCopy = [...links];
    linksCopy[index].url = url;
    setLinks(linksCopy);

    if (upload) {
      updateFirebaseLinkDocument(user.uid, { links: linksCopy });
    }
  }

  function syncFirebaseLinksWithLocalLinks() {
    if (!user) return;

    updateFirebaseLinkDocument(user.uid, { links: links });
  }

  return (
    <LinksContext.Provider
      value={{
        links,
        setLinks,
        addNewLink,
        removeLink,
        setLinkPlatform,
        setLinkUrl,
        syncFirebaseLinksWithLocalLinks,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinksContext() {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error(
      "Make sure that this component is wrapped by LinksProvider"
    );
  }

  return context;
}
