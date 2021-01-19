import Head from "next/head";
import Nav from "./components/Nav";
import Frontpage from "./components/Frontpage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main>
        <Frontpage />
      </main>
    </div>
  );
}
