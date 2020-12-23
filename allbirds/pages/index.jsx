import Head from "next/head";
// 20:45 https://www.youtube.com/watch?v=u2jiRjyUbwA
export default function Home() {
  return (
    <div>
      <Head>
        <title>Rebuild Allbirds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-4 py-1 text-white bg-lime-800">
        <p className="text-xs font-medium text-center">
          We're raising prices on all products by $1 today in support of the
          planet.{" "}
          <a href="#" className="underline">
            Learn More.
          </a>
        </p>
      </div>

      <header className="flex justify-between px-5 py-3 bg-white shadow-lg">
        <button className="w-8 h-8">
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <img
          className="h-9"
          alt="Allbirds"
          src="//cdn.allbirds.com/image/upload/v1571355713/icons/allbirds-logo.svg"
        />
        <button className="w-8 h-8">
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </header>

      <main>
        <div className="flex items-center justify-between mx-8 my-4">
          <div>
            <div className="space-x-1 text-xs font-medium text-gray-900">
              <a href="#" className="underline">
                Home
              </a>
              <span>/</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Women's Shoes
            </span>
          </div>
          <div className="flex">
            <button className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
