import React from "react";
import Hero from "../../components/home/Hero";
import ServiceCategories from "../../components/home/ServiceCategories";
import HowItWorks from "../../components/sections/HowItWorks";
import WhyChoose from "../../components/sections/WhyChoose";
import Testimonials from "../../components/sections/Testimonials";
import { useCategories } from "../../utils/UseCategories";

const Home = () => { //{categories, loading}
   const { data: categories = [], isLoading } = useCategories();
  return (
    <>
      <Hero />
      <ServiceCategories  categories={categories} loading={isLoading}/>
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
    </>
  );
};

export default Home;
