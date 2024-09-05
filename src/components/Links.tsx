import { PLATFORM_INFO } from "../pages/LinksBuilder/PLATFORM_INFO.ts";
import arrowRight from "../assets/arrow-right.svg";
import { useLinksContext } from "../context/LinksProvider.tsx";
import { Fragment } from "react";

function cleanUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

export default function Links() {
  const { links } = useLinksContext();

  return (
    <div className="w-full">
      {links.map(({ platform, url }, index) => {
        if (platform === null) {
          return (
            <Fragment key={index}>
              <div className="rounded-lg bg-gray-100 w-full h-12" />
              <div className="mt-3" />
            </Fragment>
          );
        }

        const { color, icon, label } = PLATFORM_INFO[platform];

        return (
          <Fragment key={index}>
            <a
              href={cleanUrl(url)}
              className="flex items-center gap-3 rounded-lg h-12 p-3 hover:opacity-80"
              style={{ backgroundColor: color }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="h-7" src={icon} alt="icon" />
              <div className="text-white">{label}</div>
              <div className="flex w-full justify-end">
                <img className="w-5" src={arrowRight} alt="icon" />
              </div>
            </a>
            <div className="mt-3" />
          </Fragment>
        );
      })}
    </div>
  );
}
