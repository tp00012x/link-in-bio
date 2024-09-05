import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getOrCreateFirebaseUserDocument,
  onAuthStateChangedListener,
  updateFirebaseUserDocument,
  uploadFirebaseImage,
} from "../firebase/firebase.tsx";
import Spinner from "@/components/ui/spinner.tsx";

export interface IAuthUser {
  uid: string;
  email: string;
  createdAt: Date;
}

export interface IUser {
  uid: string;
  email: string;
  createdAt: Date;
  firstName: string | undefined;
  lastName: string | undefined;
  profileUrl: string | null;
}

export const UserContext = createContext<{
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setName: (firstName: string, upload?: boolean) => void;
  setLastName: (lastName: string, upload?: boolean) => void;
  setEmail: (email: string, upload?: boolean) => void;
  setImage: (image: File, upload?: boolean) => void;
  syncFirebaseUserWithLocalUser: () => void;
}>({
  user: null,
  setUser: () => {},
  setName: () => {},
  setLastName: () => {},
  setEmail: () => {},
  setImage: () => {},
  syncFirebaseUserWithLocalUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChangedListener(async (authUser: IAuthUser | null) => {
      const isLoggedOut = authUser === null;
      if (isLoggedOut) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userData = await getOrCreateFirebaseUserDocument(authUser);
      setUser(userData);
      setLoading(false);
    });
  }, []);

  function setName(firstName: string, upload = false) {
    if (!user) return;
    setUser({ ...user, firstName: firstName });
    if (upload) {
      updateFirebaseUserDocument(user.uid, { firstName: firstName });
    }
  }

  function setLastName(lastName: string, upload = false) {
    if (!user) return;
    setUser({ ...user, lastName: lastName });
    if (upload) {
      updateFirebaseUserDocument(user.uid, { lastName: lastName });
    }
  }

  function setEmail(email: string, upload = false) {
    if (!user) return null;
    setUser({ ...user, email: email });
    if (upload) {
      updateFirebaseUserDocument(user.uid, { email: email });
    }
  }

  async function setImage(imageFile: File, upload = false) {
    if (!user) return null;
    const imageUrl = await uploadFirebaseImage(
      `profile_image_1_${user.uid}`,
      imageFile
    );
    setUser({ ...user, profileUrl: imageUrl });
    if (upload) {
      updateFirebaseUserDocument(user.uid, { profileUrl: imageUrl });
    }
  }

  function syncFirebaseUserWithLocalUser() {
    if (!user) return;

    updateFirebaseUserDocument(user.uid, { ...user });
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setName,
        setLastName,
        setEmail,
        setImage,
        syncFirebaseUserWithLocalUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Make sure that this component is wrapped by UserProvider");
  }

  return context;
}
