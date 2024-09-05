import { LinksEditor } from "./LinksEditor.tsx";
import BuilderPreview from "../../components/BuilderPreview.tsx";
import BuilderLayout from "../../layouts/BuilderLayouts.tsx";

export default function LinksBuilder() {
  return (
    <BuilderLayout preview={<BuilderPreview />} editor={<LinksEditor />} />
  );
}
