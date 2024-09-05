import ProfileDetailsEditor from "./ProfileDetailsEditor.tsx";
import BuilderPreview from "../../components/BuilderPreview.tsx";
import BuilderLayout from "../../layouts/BuilderLayouts.tsx";

export default function ProfileDetails() {
  return (
    <BuilderLayout
      preview={<BuilderPreview />}
      editor={<ProfileDetailsEditor />}
    />
  );
}
