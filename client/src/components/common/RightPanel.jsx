import { IoLogoAppleAppstore, IoLogoGooglePlaystore } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";
import userProfile from "../../assets/user.png";

export default function RightPanel() {
  const now = new Date();
  const year = now.getFullYear();

  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isPending } = useFollow();

  return (
    <div className="hidden lg:flex flex-col w-full h-full p-5">
      {/* search */}
      <div className="w-[100%] flex items-center gap-2 text-neutral-400 bg-neutral-900 rounded-md mb-5 py-3 border border-neutral-700">
        <span className="relative ml-4">
          {" "}
          <MdSearch size={20} />
        </span>
        <input
          type="search"
          name=""
          placeholder="Search..."
          className="w-full h-full bg-transparent outline-none"
        />
      </div>

      {/* download app */}
      <div className="w-[100%] flex flex-col items-start bg-neutral-800 border border-neutral-700 rounded-md p-4 gap-2">
        <h1 className="text-xl font-semibold">Stay Signed in</h1>
        <p className="text-sm">
          Download the Thoughts. app for Android or iOS{" "}
        </p>
        <div className="w-full flex gap-2">
          <button className="w-full bg-white flex items-center justify-center gap-1 text-black text-sm font-semibold lg:px-2 xl:px-4 py-1.5 rounded-full hover:bg-neutral-200">
            <IoLogoGooglePlaystore size={20} />
            Play Store
          </button>
          <button className="w-full bg-white flex items-center justify-center gap-1 text-black text-sm font-semibold lg:px-2 xl:px-4 py-1.5 rounded-full hover:bg-neutral-200">
            <IoLogoAppleAppstore size={20} />
            App Store
          </button>
        </div>
      </div>

      {/* follow */}
      {suggestedUsers && suggestedUsers.length !== 0 && (
        <div className="w-[100%] overflow-auto max-h-[22rem] mt-5 flex flex-col items-start border border-neutral-700 bg-neutral-800 rounded-md">
          <h1 className="text-xl font-semibold p-4">Who to follow</h1>
          <div className="w-full flex flex-col font-semibold">
            {isLoading ? (
              <div className="w-full">
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
              </div>
            ) : (
              suggestedUsers.map((user) => (
                <Link
                  to={`/profile/${user.username}`}
                  key={user._id}
                  className="w-full flex justify-between items-center p-4 hover:bg-neutral-600"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={user.profileImg || userProfile}
                      alt={user.username}
                      className="rounded-full h-10 w-10"
                    />
                    <div className="">
                      <p className="text-sm">{user.fullName}</p>
                      <p className="text-xs text-slate-500">@{user.username}</p>
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        follow(user._id);
                      }}
                      className="bg-white text-black text-sm lg:px-2.5 xl:px-4 py-1 rounded-full hover:bg-neutral-200"
                    >
                      {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                    </button>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {/* footer */}
      <div className="w-[100%] py-5 flex-1 space-x-2 text-sm text-neutral-100">
        <Link to="/">Terms Privacy</Link>
        <Link to="/"> About</Link>
        <Link to="/">Careers</Link>
        <Link to="/">User email verification</Link>
        <Link to="https://prabhat-singh-portfolio.vercel.app/">© {year} thoughts</Link>
      </div>
    </div>
  );
}
