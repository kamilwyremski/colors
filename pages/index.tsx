import { Inter } from "next/font/google";
import Head from "next/head";
import Converter from "./component/Converter";
import Contrast from "./component/Contrast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-5 sm:p-16 ${inter.className}`}
    >
      <Head>
        <title>HEX to RGB converter and Contrast Checker</title>
        <link rel="icon" type="image/x-icon" href="/icons/icon-512x512.png"></link>
      </Head>
      <div className="w-full max-w-5xl">
        <Converter />
        <Contrast />
        <p className="mb-10">This project is Open Source. You can see source code here: <a href="https://github.com/kamilwyremski/colors" target="_blank" rel="nofollow noopener" title="Colors in GiHub">https://github.com/kamilwyremski/colors</a></p>
        <p className="text-sm">
          Project 2023 by{" "}
          <a href="http://wyremski.pl/en" title="Web Developer">
            Kamil Wyremski
          </a>
        </p>
      </div>
    </main>
  );
}
