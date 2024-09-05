import { ReactNode } from "react";

interface IBuilderLayoutProps {
  preview: ReactNode;
  editor: ReactNode;
}

export default function BuilderLayout({
  preview,
  editor,
}: IBuilderLayoutProps) {
  return (
    <div className="relative">
      <div className="mt-7" />
      <div className="flex flex-col lg:flex-row w-full lg:p-10 bg-white rounded-lg h-screen ">
        <div className="basis-[600px]">{preview}</div>
        <div className="mt-7" />
        <div className="flex-grow">{editor}</div>
      </div>
    </div>
  );
}
