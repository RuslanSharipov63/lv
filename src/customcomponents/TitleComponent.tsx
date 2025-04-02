"use client";
import { FC } from "react";
import { Montserrat } from "next/font/google";

type TitleComponentType = {
  text: string;
};

const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "600" });

const TitleComponent: FC<TitleComponentType> = ({ text }) => {
  return (
    <h2 className={`scroll-m-20 mt-4 border-b pb-2 text-orange-600 text-3xl 
    font-semibold tracking-tight first:mt-0 text-center ${montserrat.className}`}>
      {text}
    </h2>
  );
};

export default TitleComponent;
