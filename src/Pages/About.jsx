import React from "react";

const About = () => {
  return (
    <>
      <section className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          About
        </h1>

        <article className="stats bg-green-400 shadow">
          <article className="stat">
            <article className="stat-title text-slate-100 text-3xl font-bold tracking-widest">
              MediHub
            </article>
          </article>
        </article>
      </section>

      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
        quos, facilis voluptatibus deserunt vel asperiores earum ut quisquam,
        totam cumque et. Temporibus vero voluptate praesentium accusantium sed
        nihil ullam corrupti placeat iure id, ab minus itaque? Omnis error
        assumenda tenetur pariatur similique molestias itaque eaque, magnam,
        quae officiis, unde ducimus.
      </p>
    </>
  );
};

export default About;
