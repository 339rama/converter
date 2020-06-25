import React from "react";
import { useRoutes } from "./routes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const App = ({ data }) => {
  const routes = useRoutes(data);

  return (
    <>
      <Navbar data={data} />
      {routes}
      <Footer data={data} />
    </>
  );
};
export default App;
