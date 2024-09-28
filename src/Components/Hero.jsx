import React from "react";
import { Link } from "react-router-dom";

import hero1 from "../../public/assets/hero01.png";
import hero2 from "../../public/assets/hero02.png";
import hero3 from "../../public/assets/hero03.png";

const carouselImg = [hero1, hero2, hero3];

const Hero = () => {
  return (
    <>
      <section className="grid lg:grid-cols-2 gap-24 items-center">
        {/* INFO */}
        <article className="">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6x">
            We are changing the way People shop medicines
          </h1>

          <p className="mt-8 max-w-xl text-large leading-8 ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            non, tenetur deleniti voluptatem beatae adipisci.
          </p>

          <article className="mt-10">
            <Link to="/products" className="btn btn-ghost">
              Our Products
            </Link>
          </article>
        </article>

        {/* CAROUSEL */}
        <article className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
          {carouselImg.map((item) => (
            <article key={item} className="carousel-item">
              <img
                src={item}
                alt=""
                className="rounded-box h-full w-80 object-cover"
              />
            </article>
          ))}
        </article>
      </section>
    </>
  );
};

export default Hero;
