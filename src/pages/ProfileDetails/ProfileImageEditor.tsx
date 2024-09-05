import uploadImage from "../../assets/icon-upload-image.svg";
import uploadImageGray from "../../assets/upload-img-white.svg";
import { useRef } from "react";

interface IProfileImageEditor {
  profileUrl: string | null;
  onImageChange: (image: File) => void;
}

export default function ProfileImageEditor({
  profileUrl,
  onImageChange,
}: IProfileImageEditor) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex items-center p-5 bg-dark-lighter rounded-lg">
      <div className="flex items-center gap-5 flex-grow">
        <div
          className="cursor-pointer"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          {profileUrl ? (
            <div className="relative">
              <div className="relative w-40 h-40">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={profileUrl}
                  alt="not found"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg"></div>
                <div className="flex flex-col gap-2 justify-center w-full items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                  <img
                    className="w-9 h-9"
                    src={uploadImageGray}
                    alt="uploadImg"
                  />
                  <div className="text-sm">Change Image</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-36 w-36 rounded-lg bg-purple-light">
              <div className="flex flex-col justify-center items-center gap-2">
                <img className="w-7" src={uploadImage} alt="pic" />
                <div className="text-purple font-semibold text-sm">
                  + Upload Image
                </div>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(event) => {
              if (!event.target.files) return;
              onImageChange(event.target.files[0]);
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-dark-med">
            Image must be below 1024x1024px.
          </div>
          <div className="text-sm text-dark-med">Use PNG or JPG format.</div>
        </div>
      </div>
    </div>
  );
}
