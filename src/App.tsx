import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { i18n } = useTranslation();
  const locale = useAuthStore((state) => state.member?.locale);

  useEffect(() => {
    if (locale && locale !== i18n.language) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;