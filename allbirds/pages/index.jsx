import Head from "next/head";
// 20:45 https://www.youtube.com/watch?v=u2jiRjyUbwA
export default function Home() {
  const categories = [
    "Women's Running Shoes",
    "Everyday Sneakers",
    "Slip-Ons",
    "High Tops",
    "Boat Shoes",
    "Flats",
    "Weather Repellent Shoes",
  ];
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
          className="h-9 "
          alt="Allbirds"
          src="//cdn.allbirds.com/image/upload/v1571355713/icons/allbirds-logo.svg"
        />
        <button className="w-8 h-8">
          <svg
            className="w-8 h-8 "
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
        <div>
          <div className="flex items-center justify-between mx-8 my-3">
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
            {/* button is inline block by default which inherts the line height. So can fix it by either putting display block on button, or wrapping it in flex div */}
            <div className="flex">
              <button className="w-6 h-6">
                <svg
                  className="transform rotate-90"
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

          {/* Categories */}
          <ul>
            <div className="flex px-8 py-3 space-x-5 overflow-x-scroll bg-gray-100 scrollbar-hidden whitespace-nowrap">
              {categories.map((category) => (
                <li key={category} className="text-sm list-none">
                  <a href="#" className="text-gray-800">
                    {category}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className="py-8">
          <div className="flex items-center px-8 py-3 space-x-4 bg-green-700 bg-opacity-20">
            <div>
              <svg
                className="transform w-14 h-14 rotate-12"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <div>
              <div className="flex space-x-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  Pay It To The Planet
                </h2>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mt-1 text-sm font-light">
                Every Black Friday purchase supports Fridays for Future
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
