import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import Booksdata from "@/components/Booksdata";
import Footer from "@/components/Footer";
import Image from "next/image";
import heroImage from "@/assets/hero_images.png";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section
        id="hero_Section"
        className="bg-bgBanner flex md:flex-row flex-col md:justify-center justify-start items-start md:items-center w-full p-5 gap-10"
      >
        <div className="w-1/2">
          <h2 className="md:text-5xl text-4xl font-semibold font-Poppins mb-2">
            The Ultimate Library Management Tool
          </h2>
        </div>

        <Image
          src={heroImage}
          alt="hero_image"
          className="w-96 h-auto"
        />
      </section>

      <Categories />
      <Booksdata />
      <Footer />
    </div>
  );
}