/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Heading from "../../Shared/Heading/Heading";
import useTitle from "../../Hooks/useTitle";
import AllDrawings from "./AllDrawings";

const Home = () => {
  useTitle("Home"),
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <h1 className="text-4xl">home</h1>
      <SectionTitle
        subHeading="Explorer"
        heading="Featured Item"
      ></SectionTitle>

      <Heading title="Explorer" subtitle="Featured Item"></Heading>

      <AllDrawings />
    </div>
  );
};

export default Home;
