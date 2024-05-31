import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
