import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";
import { useAuth } from "../../auth/hooks/useAuth";

const Layout = () => {
  const { user, loading, handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Nav />
      <div className="layout-content" style={{ paddingBottom: "70px", paddingTop: "60px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
