import React from "react";
import Slider from "../Components/Slider";
import PromoBanar from "../Components/Promo.Banar";


import OurCategorys from "../Components/OurCategorys";
import BannersSection from "../Components/BannersSection";
import FeaturesProduct from "../Components/FeaturesProduct";
import Newsletter from "../Components/Newsletter";
import FeaturesBar from "../Components/FeaturesBar";

export default function HomeScreen() {
  return (
    <>
      <Slider />
      <PromoBanar />
      <OurCategorys />
      <BannersSection/>
      <FeaturesProduct/>
      <Newsletter/>
      <FeaturesBar/>
    </>
  );
}
