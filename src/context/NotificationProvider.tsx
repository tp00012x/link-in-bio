import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface INotificationPopup {
  icon: string;
  label: string;
}

function NotificationPopup({ icon, label }: INotificationPopup) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="relative flex items-center mb-5">
        <img className="absolute pl-2.5" src={icon} alt="clipboard" />
        <div className="flex justify-center items-center bg-dark h-12 w-96 rounded-lg text-white">
          {label}
        </div>
      </div>
    </div>
  );
}

interface INotification {
  label: string;
  icon: string;
  isDisplayed: boolean;
}

export const NotificationContext = createContext<{
  notification: INotification;
  setNotification: Dispatch<SetStateAction<INotification>>;
}>({
  notification: { label: "", icon: "", isDisplayed: false },
  setNotification: () => {},
});

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] = useState({
    label: "",
    icon: "",
    isDisplayed: false,
  });

  useEffect(() => {
    if (notification.isDisplayed) {
      setTimeout(() => {
        setNotification({ label: "", icon: "", isDisplayed: false });
      }, 2000);
    }
  }, [notification.isDisplayed]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
      {notification.isDisplayed && (
        <NotificationPopup
          icon={notification.icon}
          label={notification.label}
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "Make sure that this component is wrapped by NotificationProvider"
    );
  }

  return context;
}
