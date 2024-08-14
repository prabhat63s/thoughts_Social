import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPerson } from "react-icons/bs";
import { TfiLayoutMediaLeft } from "react-icons/tfi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import { TbMenu } from "react-icons/tb";
import { formatMemberSinceDate } from "../../utils/date";
import { Link, NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

export default function MobileMenu() {
  const [nav, setNav] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const memberSinceDate = formatMemberSinceDate(authUser?.createdAt);

  const menu = [
    {
      to: `/profile/${authUser?.username}`,
      icon: <BsPerson />,
      title: "Profile",
    },
    {
      to: "/about",
      icon: <MdOutlineRoundaboutRight />,
      title: "About",
    },
    {
      to: "/terms-of-use",
      icon: <TfiLayoutMediaLeft />,
      title: "Terms of use",
    },
    {
      to: "/faq",
      icon: <FaRegCircleQuestion />,
      title: "FAQs",
    },
  ];

  return (
    <div
      onClick={() => {
        setNav(!nav);
      }}
      className="text-white block md:hidden "
    >
      {nav ? "" : <TbMenu size={24} />}

      {nav && (
        <div
          className={
            nav
              ? "absolute top-0 right-0 w-[80%] h-screen z-50 border-l border-neutral-700 bg-gradient-to-bl from-neutral-950 to-neutral-700  font-semibold"
              : "absolute top-[100%]"
          }
        >
          <div className="w-[100%] flex flex-col gap-4 py-4">
            <div className="text-white flex justify-end font-bold pr-2">
              <IoIosClose size={40} />
            </div>
            <div className="flex flex-col pb-4 border-neutral-700 border-b px-5">
              {/* user profile */}
              <div className="flex justify-between">
                <img
                  src="https://prabhat-singh.vercel.app/static/media/Profile.60e11bf6995c511be0bb.jpg"
                  className="h-12 rounded-full"
                  alt=""
                />
              </div>
              <p className="text-lg mt-2 font-semibold">{authUser?.fullName}</p>
              <p className="text-sm text-slate-500">@{authUser?.username}</p>
              <div className="flex mt-2 flex-col gap-2">
                <p className="text-sm ">{authUser?.bio}</p>
                {authUser?.link && (
                  <div className="flex gap-1 items-center ">
                    <FaLink className="w-3 h-3 text-slate-500" />
                    <Link
                      to={authUser?.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm w-full truncate text-blue-500 hover:underline"
                    >
                      {authUser?.link}
                    </Link>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-500">
                    {memberSinceDate}
                  </span>
                </div>
                <div className="flex gap-4 py-1">
                  <p className="flex gap-2 items-center">
                    {authUser?.following.length}
                    <span className="text-slate-500 text-sm">Followers</span>
                  </p>
                  <p className="flex gap-2 items-center">
                    {authUser?.followers.length}
                    <span className="text-slate-500 text-sm">Following</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-4 gap-4 border-neutral-700 border-b px-5">
              {/* user menu */}
              {menu.map((m, index) => (
                <NavLink
                  to={m.to}
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "w-fit flex items-center gap-2"
                      : "w-fit flex items-center gap-2 text-neutral-400 hover:text-white"
                  }
                >
                  {m.icon} {m.title}
                </NavLink>
              ))}
            </div>
            <div className="flex pb-4 gap-4 border-neutral-700 border-b px-5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="flex items-center gap-2"
              >
                <BiLogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
