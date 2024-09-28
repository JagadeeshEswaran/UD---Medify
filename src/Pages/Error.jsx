import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <article className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            page not found
          </h1>

          <p className="mt-6 text-lg leading-7">
            Sorry, we can't find the page you're looing for
          </p>

          <article className="mt-10">
            <Link to="/" className="btn btn-ghost">
              Go back Home
            </Link>
          </article>
        </article>
      </main>
    );
  }

  return (
    <>
      <main className="grid min-h-[100vh] place-items-center px-8">
        <h4 className="text-center font-bold text-4xl">
          there was an error...
        </h4>
      </main>
    </>
  );
};

export default Error;
