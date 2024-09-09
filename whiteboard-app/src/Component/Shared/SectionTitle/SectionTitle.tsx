import { FC } from "react";

interface SectionTitleProps {
  heading: string;
  subHeading: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-6/12 my-12">
      <p className="text-2xl font-semibold text-transparent bg-clip-text text-white tracking-wide mb-4">
        ~ {subHeading} ~
      </p>
      <h3 className="text-4xl font-extrabold uppercase tracking-widest py-5 px-6 border-b-4 border-black  text-white shadow-md inline-block">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
