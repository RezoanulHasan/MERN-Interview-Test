import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Component/Shared/Footer/Footer";
import Navbar from "./Component/Shared/Navbar/Navbar";
import { Link } from "react-scroll";
import { FaArrowUp } from "react-icons/fa";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top">
      <Navbar />

      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>

      <div className="card-actions justify-center">
        <Link to="top" smooth={true} duration={500}>
          <button className="btn bg-black text-white  hover:btn ">
            <FaArrowUp className=""></FaArrowUp>
          </button>
        </Link>{" "}
      </div>

      <Footer />
    </div>
  );
};

export default App;
