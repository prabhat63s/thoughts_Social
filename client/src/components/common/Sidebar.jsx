import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdOutlineNotifications,
  MdOutlineRoundaboutRight,
} from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { BsChatDots, BsPerson, BsSearch } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import user from "../../assets/user.png";

export default function Sidebar() {

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

  //  links, icon, title
  const nav = [
    {
      to: "/",
      icon: <MdHome size={20} />,
      title: "Home",
    },
    {
      to: "/explore",
      icon: <BsSearch size={20} />,
      title: "Explore",
    },
    {
      to: "/notifications",
      icon: <MdOutlineNotifications size={20} />,
      title: "Notifications",
    },
    {
      to: "/message",
      icon: <BsChatDots size={20} />,
      title: "Messages",
    },
    {
      to: `/profile/${authUser?.username}`,
      icon: <BsPerson size={20} />,
      title: "Profile",
    },
    {
      to: "/about",
      icon: <MdOutlineRoundaboutRight size={20} />,
      title: "About",
    },
  ];

  return (
    <div className="hidden lg:flex w-full h-full ">
      <div className=" h-screen flex flex-col py-2 pl-5 gap-4">
        <NavLink to="/" className="text-2xl pb-4">
          <img src="/t.png" alt="logo" className="w-10" />
        </NavLink>
        {nav.map((nav, index) => (
          <NavLink
            to={nav.to}
            key={index}
            className={({ isActive }) =>
              isActive
                ? "w-fit text-base flex items-center gap-4  bg-neutral-600 px-2 lg:px-4 py-2 rounded-full"
                : "w-fit text-base flex items-center gap-4  hover:bg-neutral-600 px-2 lg:px-4 py-2 rounded-full"
            }
          >
            {nav.icon} <p>{nav.title}</p>
          </NavLink>
        ))}

        

        <div className=" fixed bottom-5">
          {authUser && (
            <NavLink
              to={`/profile/${authUser.username}`}
              className="flex items-center gap-2 border border-neutral-600 text-base text-white p-2  rounded-full hover:bg-neutral-600 pr-4"
            >
              <div className="">
                <img
                  src={authUser?.profileImg || user}
                  className="rounded-full h-10 w-10"
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="hidden md:block">
                  <p className="font-medium text-sm w-28 truncate">
                    {authUser?.fullName}
                  </p>
                  <p className="text-slate-500 text-sm">
                    @{authUser?.username}
                  </p>
                </div>
                <BiLogOut
                  className="w-5 h-5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                />
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
