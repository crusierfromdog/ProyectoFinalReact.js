import "../App.css";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppStateContext from "../StateContext";

const Layout = () => {
  const { appState } = useContext(AppStateContext);
  const categories = appState.catalog.map((category) => category.name);
  const cart = appState.cart;

  return (
    <>
      <Navbar categories={categories} cart={cart} />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
