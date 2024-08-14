import { MdSearch } from "react-icons/md";
import Layout from "../components/layout/Layout";
import MobileMenu from "../components/common/MobileMenu";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RightPanelSkeleton from "../components/skeletons/RightPanelSkeleton";
import useFollow from "../hooks/useFollow";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import userProfile from "../assets/user.png";


export default function Explore() {
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
    <Layout>
      <div className="h-screen w-[100%] flex">
        <div className="w-full overflow-x-hidden overflow-y-auto border-l border-r border-neutral-700">
          <div className="hidden lg:flex p-5">
            <h1 className="text-2xl">Explore</h1>
          </div>
          <div className="flex items-center py-4 border-neutral-700 border-b border-t px-4">
            {/* search */}
            <div className="w-[100%] flex bg-inherit items-center gap-2  h-10 text text-neutral-400">
              <span className="fixed ml-4">
                <MdSearch size={20} />{" "}
              </span>
              <input
                type="search"
                name=""
                placeholder="Search profile, topics, hashtags..."
                className="w-[95%] md:w-full h-full bg-neutral-800 border-neutral-700 border focus:neutral-800 rounded-full pl-12 pr-4"
              />
            </div>
            <div className="">
              <MobileMenu />
            </div>
          </div>
          <div className="">
            <h1 className="text-xl font-medium p-4">Weekly Top Creators</h1>
            <div className="w-full flex flex-col font-semibold">
              {suggestedUsers && suggestedUsers.length !== 0 && (
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
                            <p className="text-xs text-slate-500">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              follow(user._id);
                            }}
                            className="bg-white text-black text-sm px-2.5 xl:px-4 py-1 rounded-full hover:bg-neutral-200"
                          >
                            {isPending ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              "Follow"
                            )}
                          </button>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
