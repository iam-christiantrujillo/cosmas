import ComingSoon from "@/containers/ComingSoon";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>COSMAS</title>
        <meta name="description" content="En un contexto donde la relación entre marca y consumidor se distancia cada vez más, es fundamental encontrar los puntos de conexión entre cliente y marca." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="coming-soon fade-in">
        <main>
          <ComingSoon/>

        </main>
        <footer>
          <p>© {`${new Date().getFullYear()}`} COSMAS CORPORATION</p>
        </footer>
      </div>
    </>
  );
}
