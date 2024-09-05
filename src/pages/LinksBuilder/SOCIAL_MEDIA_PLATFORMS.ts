export const SOCIAL_MEDIA_PLATFORMS = {
  GITHUB: "github",
  YOUTUBE: "youtube",
  LINKEDIN: "linkedin",
  FACEBOOK: "facebook",
} as const;

export type IPlatform = ObjectValues<typeof SOCIAL_MEDIA_PLATFORMS>;
