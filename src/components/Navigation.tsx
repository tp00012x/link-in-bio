import classNames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserProvider.tsx";
import { MdAccountCircle } from "react-icons/md";
import useIsMobile from "../hooks/useIsMobile.ts";
import { FiLogOut } from "react-icons/fi";

interface INavBarProp {
  onLinksClick: () => void;
  onProfileClick: () => void;
  onSignOutBtn: () => void;
  onSignInBtn: () => void;
  onPreviewBtn: () => void;
}

export default function Navigation({
  onLinksClick,
  onProfileClick,
  onSignOutBtn,
  onSignInBtn,
  onPreviewBtn,
}: INavBarProp) {
  const { user } = useUserContext();

  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <div className="p-5">
      <div className="p-3 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <div className="font-bold hidden lg:block">LIB</div>
          <div className="flex items-center gap-8">
            <button
              onClick={onLinksClick}
              className={classNames("font-semibold py-2 px-5 rounded-lg", {
                "bg-purple-light hover:bg-purple-med text-purple":
                  location.pathname === "/",
                "hover:text-purple text-dark-med": location.pathname !== "/",
              })}
            >
              Links
            </button>
            <button
              onClick={onProfileClick}
              className={classNames("font-semibold py-2 px-5 rounded-lg", {
                "bg-purple-light hover:bg-purple-med text-purple":
                  location.pathname === "/profile",
                "hover:text-purple text-dark-med":
                  location.pathname !== "/profile",
              })}
            >
              {isMobile ? (
                <MdAccountCircle className="text-purple text-2xl" />
              ) : (
                "Profile Details"
              )}
            </button>
          </div>
          <div className="flex items-center gap-3">
            {!user ? (
              <button
                onClick={onSignInBtn}
                className="font-medium text-purple hover:text-dark"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={onSignOutBtn}
                className="font-medium text-purple hover:text-dark"
              >
                {isMobile ? (
                  <FiLogOut className="text-purple text-2xl" />
                ) : (
                  "Sign Out"
                )}
              </button>
            )}
            <button
              onClick={onPreviewBtn}
              className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
