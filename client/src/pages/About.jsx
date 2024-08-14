import {
  FaArrowRightLong,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import ui from "../assets/ui.png";

export default function About() {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="w-full h-screen lg:w-[80%] mx-auto flex flex-col gap-6 py-10 lg:flex-row overflow-auto">
      <div className="w-full lg:w-[40%] flex justify-center items-center">
        <img src={ui} className="h-[40vh] lg:h-[80vh]" alt="" />
      </div>
      <div className="w-full lg:w-[60%] px-5 text-center flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl lg:text-6xl font-semibold">thoughts</h1>
        <p className="text-xl lg:text-2xl font-semibold">
          A new-way to share your thoughts on social network
        </p>
        <p className="">
          Behind every mask lies a story waiting to be told...
        </p>
        <Link
          to="/"
          className="bg-white flex gap-4 items-center w-fit text-black text-lg font-semibold px-8 py-2 rounded-full hover:bg-neutral-400"
        >
          Go to Feed <FaArrowRightLong />
        </Link>
        <div className="flex flex-row gap-4 my-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
            className="w-40 h-12"
            alt=""
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png"
            className="w-40 h-12"
            alt=""
          />
        </div>
        <div className="flex space-x-2 text-sm text-neutral-100">
          <Link to="/">Terms Privacy</Link>
          <Link to="/">Careers</Link>
          <Link to="/">User email verification</Link>
        </div>
        <div className="flex space-x-4 items-center text-xs">
          <Link to="/">
            <FaXTwitter size={22} />
          </Link>
          <Link to="/">
            <FaLinkedin size={22} />
          </Link>
          <Link to="/">
            <FaFacebook size={22} />
          </Link>
          <Link to="/">
            <FaInstagram size={22} />
          </Link>
          <Link to="/">
            <IoIosMail size={26} />
          </Link>
        </div>
        <Link to="/">© {year} thoughts | All rights reserved</Link>
      </div>
    </div>
  );
}
