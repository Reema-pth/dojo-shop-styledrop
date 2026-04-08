import SocialMediaFooter from "./SocialMediaFooter";
import { HiChevronDown } from "react-icons/hi2";


const Footer = () => {
  return (
    <>
      <SocialMediaFooter />
      <footer className="max-w-screen-2xl mx-auto border-b-8 border-secondaryBrown px-5 max-[400px]:px-3">
        <div className="flex justify-center gap-24 text-center mt-12 max-[800px]:flex-col max-[800px]:gap-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">Service Client</h3>
            <p className="text-lg max-sm:text-base">Livraison offerte dès 80€</p>
            <p className="text-lg max-sm:text-base">Retours sous 30 jours</p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">eXalt</h3>
            <p className="text-lg max-sm:text-base">Notre ADN</p>
            <p className="text-lg max-sm:text-base">Nos expertises</p>
            <p className="text-lg max-sm:text-base">Rejoindre eXalt</p>
            <p className="text-lg max-sm:text-base">Notre histoire</p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">Collections</h3>
            <p className="text-lg max-sm:text-base">Vêtements</p>
            <p className="text-lg max-sm:text-base">Accessoires</p>
            <p className="text-lg max-sm:text-base">Limited Edition</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 my-20">
          <p className="flex justify-center items-center text-2xl gap-2 max-sm:text-xl">Worldwide / English <HiChevronDown /></p>
          <div className="flex justify-center">
            <img src="https://images.prismic.io/exalt/ZlTQKaWtHYXtT1CW_HEADER_Logo.png?auto=format%2Ccompress&fit=max&w=256" alt="eXalt" className="h-10" />
          </div>
          <p className="text-base text-center max-sm:text-sm">All rights reserved © eXalt 2025</p>
          <ul className="flex justify-center items-center gap-7 text-base max-sm:text-sm max-[350px]:flex-col max-[350px]:gap-5">
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Legal Notes</li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
