import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfile from "../profile/EditProfile";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";
import userProfile from "../../assets/user.png";
import coverPicture from "../../assets/cover.jpeg";
import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import Layout from "../../components/layout/Layout";

export default function ProfilePage() {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { username } = useParams();

  const { follow, isPending } = useFollow();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();

  const isMyProfile = authUser._id === user?._id;
  const memberSinceDate = formatMemberSinceDate(user?.createdAt);
  const amIFollowing = authUser?.following.includes(user?._id);

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  return (
    <Layout>
      <div className="w-full h-full overflow-x-hidden overflow-y-auto border-l border-r border-neutral-700">
        {/* HEADER */}
        {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
        {!isLoading && !isRefetching && !user && (
          <p className="text-center text-lg mt-4">User not found</p>
        )}
        <div className="flex flex-col">
          {!isLoading && !isRefetching && user && (
            <>
              <div className="flex gap-10 px-4 py-2 items-center">
                <Link to="/">
                  <FaArrowLeft className="w-4 h-4" />
                </Link>
                <div className="flex flex-col">
                  <p className="text-2xl">{user?.fullName}</p>
                  <span className="text-sm text-slate-500">
                    {POSTS?.length} posts
                  </span>
                </div>
              </div>
              {/* COVER IMG */}
              <div className="relative group/cover">
                <img
                  src={coverImg || user?.coverImg || coverPicture}
                  className="h-40 w-full object-cover"
                  alt="cover image"
                />
                {isMyProfile && (
                  <div
                    className="absolute top-2 right-2 rounded-full p-2 bg-neutral-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                    onClick={() => coverImgRef.current.click()}
                  >
                    <MdEdit className="w-4 h-4 text-white" />
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, "profileImg")}
                />
                {/* USER AVATAR */}
                <div className="avatar absolute -bottom-10 left-4">
                  <div className="w-20 rounded-full relative group/avatar">
                    <img
                      src={profileImg || user?.profileImg || userProfile}
                      className="rounded-full w-20 h-20 border-blue-500 border-2"
                    />
                    <div className="absolute top-7 right-7 p-1  group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                      {isMyProfile && (
                        <MdEdit
                          className="w-4 h-4 text-white hover:cursor-pointer"
                          onClick={() => profileImgRef.current.click()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-4 mt-5">
                {isMyProfile && <EditProfile authUser={authUser} />}
                {!isMyProfile && (
                  <button className="" onClick={() => follow(user?._id)}>
                    {isPending && "Loading..."}
                    {!isPending && amIFollowing && "Unfollow"}
                    {!isPending && !amIFollowing && "Follow"}
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className=" text-white px-4 ml-2"
                    onClick={async () => {
                      await updateProfile({ coverImg, profileImg });
                      setProfileImg(null);
                      setCoverImg(null);
                    }}
                  >
                    {isUpdatingProfile ? "Updating..." : "Update"}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-5 px-4">
                <div className="flex flex-col">
                  <span className="text-xl font-medium">{user?.fullName}</span>
                  <span className="text-sm text-slate-500">
                    @{user?.username}
                  </span>
                  <span className="text-sm my-1">{user?.bio}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {user?.link && (
                    <div className="flex gap-1 items-center ">
                      <>
                        <FaLink className="w-3 h-3 text-slate-500" />
                        <Link
                          to={user?.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {user?.link}
                        </Link>
                      </>
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      {memberSinceDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="text-sm">{user?.following.length}</span>
                    <span className="text-slate-500 text-xs">Following</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="text-sm">{user?.followers.length}</span>
                    <span className="text-slate-500 text-xs">Followers</span>
                  </div>
                </div>
              </div>
              {/* Sticky content */}
              <div className="sticky border-b border-t mt-4 border-neutral-700 flex top-0 z-20 backdrop-blur-2xl h-14 transition-all duration-300 ease-in-out">
                <div
                  className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType("posts")}
                >
                  Posts
                  {feedType === "posts" && (
                    <div className="absolute bottom-0 w-16 border-b-4 rounded-full bg-primary" />
                  )}
                </div>
                <div
                  className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType("likes")}
                >
                  Likes
                  {feedType === "likes" && (
                    <div className="absolute bottom-0 w-16 border-b-4 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            </>
          )}

          {/* non-Sticky content */}
          <Posts feedType={feedType} username={username} userId={user?._id} />
        </div>
      </div>
    </Layout>
  );
}
