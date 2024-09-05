import Links from "./Links.tsx";
import { useUserContext } from "../context/UserProvider.tsx";
import LinksProfilePicture from "./LinksProfilePicture.tsx";
import LinksInformation from "./LinksInformation.tsx";
import { useLinksContext } from "../context/LinksProvider.tsx";

function PreviewLinkSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-gray-100 w-52 h-12" />
      <div className="rounded-lg bg-gray-100 w-52 h-12" />
      <div className="rounded-lg bg-gray-100 w-52 h-12" />
      <div className="rounded-lg bg-gray-100 w-52 h-12" />
      <div className="rounded-lg bg-gray-100 w-52 h-12" />
    </div>
  );
}

export default function BuilderPreview() {
  const { links } = useLinksContext();
  const { user } = useUserContext();

  if (!user) {
    return null;
  }

  const { firstName, lastName, email } = user;

  return (
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="mx-auto border-gray-800 dark:border-gray-800 border rounded-[2.5rem] h-[580px] w-[280px]">
        <div className="mt-2.5 mx-auto border-gray-800 dark:border-gray-800 border rounded-[2rem] h-[560px] w-[260px]">
          <div className="flex flex-col justify-center items-center p-6">
            <LinksProfilePicture />
            {firstName || lastName || email ? (
              <LinksInformation />
            ) : (
              <>
                <div className="mt-6" />
                <div className="rounded-lg bg-gray-100 w-36 h-4" />
                <div className="mt-3" />
                <div className="rounded-lg bg-gray-100 w-20 h-2" />
                <div className="mt-5" />
              </>
            )}
            {links.length ? <Links /> : <PreviewLinkSkeleton />}
          </div>
        </div>
      </div>
    </div>
  );
}
