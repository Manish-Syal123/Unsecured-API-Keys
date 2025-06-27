import React from "react";
import { Hero } from "../hero";

const Home = () => {
  return (
    <div>
      <Hero
        title="Unsecured"
        subtitle={'The Wall  of "Well, That Wasn\'t Supposed to Go Live"'}
        actions={[
          {
            label: "Try Demo",
            href: "#",
            variant: "outline",
          },
          {
            label: "Start Now",
            href: "#",
            variant: "default",
          },
        ]}
        titleClassName="text-5xl md:text-6xl font-extrabold"
        subtitleClassName="text-lg md:text-xl max-w-[600px]"
        actionsClassName="mt-8"
      />
    </div>
  );
};

export default Home;
