import { useNavigate } from "react-router-dom";

export default function useAppNavigation() {
  const navigate = useNavigate();

  function navigateHome() {
    navigate("/");
  }

  function navigateToProfile() {
    navigate("/profile");
  }

  function navigateToPreview() {
    navigate("/preview");
  }

  return {
    navigateHome,
    navigateToProfile,
    navigateToPreview,
  };
}
