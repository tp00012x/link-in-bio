import React, { useState } from "react";
import arrowDown from "../../assets/arrow-down.svg";

import { IPlatform, SOCIAL_MEDIA_PLATFORMS } from "./SOCIAL_MEDIA_PLATFORMS.ts";

import { IPlatformLabel, PLATFORM_INFO } from "./PLATFORM_INFO.ts";
import classNames from "classnames";

const dropdownPlatforms = [
  SOCIAL_MEDIA_PLATFORMS.LINKEDIN,
  SOCIAL_MEDIA_PLATFORMS.GITHUB,
  SOCIAL_MEDIA_PLATFORMS.YOUTUBE,
  SOCIAL_MEDIA_PLATFORMS.FACEBOOK,
];

interface ILinkProps {
  selectedDropdownOption: IPlatformLabel | "Options";
  linkNumber: number;
  onRemoveClick: () => void;
  onAddPlatformClick: (platform: IPlatform) => void;
  onUrlChange: React.ChangeEventHandler<HTMLInputElement>;
  url: string;
  isError: boolean;
}

export function LinkEditor({
  selectedDropdownOption,
  linkNumber,
  onRemoveClick,
  onAddPlatformClick,
  onUrlChange,
  url,
  isError,
}: ILinkProps) {
  const [isDropdownDisplay, setIsDropdownDisplay] = useState(false);

  return (
    <div className="bg-dark-lighter rounded-lg p-5 mb-5">
      <div className="flex justify-between">
        <div className="font-semibold text-sm text-dark-med pb-3">
          Link #{linkNumber}
        </div>
        <button onClick={onRemoveClick} className="text-sm text-dark-med">
          remove
        </button>
      </div>
      <div className="relative text-left">
        <div className="text-xs text-dark-med pb-1">Platform</div>
        <div>
          <button
            onClick={() => setIsDropdownDisplay(!isDropdownDisplay)}
            type="button"
            className="relative flex w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:shadow-md ring-1 ring-inset ring-gray-300 hover:ring-purple-med hover:bg-gray-50"
          >
            {selectedDropdownOption}
          </button>
          <img
            className="absolute right-5 pt-7 h-4 w-4"
            src={arrowDown}
            alt="arrowDown"
          />
        </div>
        {isDropdownDisplay && (
          <div className="divide-y absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {dropdownPlatforms.map((platform) => {
              const label = PLATFORM_INFO[platform].label;
              return (
                <div key={label} className="py-0.5">
                  <button
                    onClick={() => {
                      setIsDropdownDisplay(false);
                      onAddPlatformClick(platform);
                    }}
                    className="text-gray-700 px-4 py-2 text-sm w-full text-left"
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="pt-5">
        <div className="text-xs text-dark-med pb-1">Link</div>
        <div className="relative">
          {isError && !url && (
            <div className="absolute text-xs text-red-500 right-2 top-2.5 z-10">
              Please check the URL
            </div>
          )}
          <input
            value={url}
            onChange={onUrlChange}
            className={classNames(
              "relative flex w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-thin text-gray-900 hover:shadow-md ring-1 ring-inset ring-gray-300 hover:ring-purple-med hover:bg-gray-50",
              {
                "ring-1 outline-none ring-red-400": isError && !url,
              }
            )}
            placeholder="e.g https://www.github/yourname"
          />
        </div>
      </div>
    </div>
  );
}
