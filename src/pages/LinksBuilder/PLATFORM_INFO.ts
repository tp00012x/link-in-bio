import { IPlatform, SOCIAL_MEDIA_PLATFORMS } from "./SOCIAL_MEDIA_PLATFORMS.ts";
import github from "../../assets/icon-github.svg";
import youtube from "../../assets/icon-youtube.svg";
import linkedin from "../../assets/icon-linkedin.svg";
import facebook from "../../assets/icon-facebook.svg";

export const PLATFORM_INFO = {
  [SOCIAL_MEDIA_PLATFORMS.GITHUB]: {
    label: "GitHub",
    icon: github,
    color: "#171515",
  },
  [SOCIAL_MEDIA_PLATFORMS.YOUTUBE]: {
    label: "YouTube",
    icon: youtube,
    color: "#c4302b",
  },
  [SOCIAL_MEDIA_PLATFORMS.LINKEDIN]: {
    label: "LinkedIn",
    icon: linkedin,
    color: "#86888a",
  },
  [SOCIAL_MEDIA_PLATFORMS.FACEBOOK]: {
    label: "Facebook",
    icon: facebook,
    color: "#3b5998",
  },
} as const;

export type IPlatformLabel = (typeof PLATFORM_INFO)[IPlatform]["label"];
