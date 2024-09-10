/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";

import useTitle from "../../Hooks/useTitle";

import Container from "../../Shared/Container";
import AddDrawing from "../Drawing/ADDDrawing/AddDrawing";

const Home = () => {
  useTitle("Home"),
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <Container>
        <AddDrawing></AddDrawing>
      </Container>
    </div>
  );
};

export default Home;
