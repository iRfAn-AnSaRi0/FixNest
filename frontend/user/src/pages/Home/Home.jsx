import React from "react";
import Hero from "../../components/home/Hero";
import ServiceCategories from "../../components/home/ServiceCategories";
import HowItWorks from "../../components/sections/HowItWorks";
import WhyChoose from "../../components/sections/WhyChoose";
import Testimonials from "../../components/sections/Testimonials";

const Home = ({categories, loading}) => {
  return (
    <>
      <Hero />
      <ServiceCategories  categories={categories} loading={loading}/>
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
    </>
  );
};

export default Home;
