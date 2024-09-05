import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import LinksBuilder from "./pages/LinksBuilder";
import LinksProvider from "./context/LinksProvider.tsx";
import ProfileDetails from "./pages/ProfileDetails";
import SignIn from "./pages/SignIn.tsx";
import "./index.css";
import SignUp from "./pages/SignUp.tsx";
import Preview from "./pages/Preview.tsx";
import { signOutUser } from "./firebase/firebase.tsx";
import NotificationProvider from "./context/NotificationProvider.tsx";
import useAppNavigation from "./hooks/useAppNavigation.ts";
import { useUserContext } from "./context/UserProvider.tsx";

export default function App() {
  const { user } = useUserContext();

  const { navigateHome, navigateToProfile, navigateToPreview } =
    useAppNavigation();

  return (
    <>
      <NotificationProvider>
        <LinksProvider>
          <div className="bg-dark-lighter h-screen">
            <Routes>
              {user === null ? (
                <>
                  <Route
                    path="/"
                    element={
                      <SignIn
                        onSignInSuccess={() => {
                          navigateHome();
                        }}
                      />
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      <SignUp
                        onSignUpSuccess={() => {
                          navigateHome();
                        }}
                      />
                    }
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/"
                    element={
                      <Navigation
                        onLinksClick={() => {
                          navigateHome();
                        }}
                        onProfileClick={() => {
                          navigateToProfile();
                        }}
                        onSignOutBtn={() => {
                          navigateHome();
                          signOutUser();
                        }}
                        onSignInBtn={() => {
                          navigateHome();
                        }}
                        onPreviewBtn={() => {
                          navigateToPreview();
                        }}
                      />
                    }
                  >
                    <Route index element={<LinksBuilder />} />
                    <Route path="profile" element={<ProfileDetails />} />
                  </Route>
                  <Route path="preview" element={<Preview />} />
                </>
              )}
            </Routes>
          </div>
        </LinksProvider>
      </NotificationProvider>
    </>
  );
}
