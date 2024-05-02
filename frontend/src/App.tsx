import HomePage from "./pages/Home";
import { Routes, Route } from "react-router";
import AccountPage from "./pages/AccountPage";
import ForgotPassword from "./pages/ForgotPassword";
import FilesBrowsingScreen from "./pages/FilesBrowsingScreen";
import PDFPage from "./pages/PdfPage";
import SearchResultsScreen from "./pages/SearchResultsScreen";
import { ROUTES } from "./utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { addUser, fetchUserDataByEmail, logIn } from "./services";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const handleAuth = async () => {
    const email = user?.email ?? "before@gmail.com";
    const name = user?.name;
    const password = "defaul@123";
    const res = await fetchUserDataByEmail(email);
    if (!res) {
      const response = await addUser(email, name, password);
      localStorage.setItem("name", name ?? "hello");
      localStorage.setItem("id", response.id);
    } else {
      localStorage.setItem("name", res.name);
      localStorage.setItem("id", res.id);
    }
    const response = await logIn(email, password);
    if (response) {
      localStorage.setItem("token", response);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleAuth();
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<AccountPage type="login" />} />
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SIGNUP} element={<AccountPage type="signup" />} />
      <Route path={ROUTES.LOGIN} element={<AccountPage type="login" />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.FILES_BROWSING} element={<FilesBrowsingScreen />} />
      <Route path={ROUTES.PDF_PAGE} element={<PDFPage />} />
      <Route path={ROUTES.SEARCH_RESULTS} element={<SearchResultsScreen />} />
    </Routes>
  );
};
export default App;
