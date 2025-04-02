import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import AuthCallBackPage from "./pages/auth-callback/AuthCallBackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.tsx";
import { ChatPage } from "./pages/chat/ChatPage.tsx";
import AlbumPage from "./pages/album/AlbumPage.tsx";
import AdminPage from "./pages/admin/AdminPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
