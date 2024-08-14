const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full my-2 p-4">
      <div className="flex gap-2 items-center">
        <div className="flex flex-1 gap-1">
          <div className="flex flex-col gap-1 w-full">
            {/* Avatar */}
            <div className="animate-pulse h-10 w-10 rounded-full bg-gray-300"></div>
            {/* Full Name */}
            <div className="animate-pulse h-4 w-16 rounded-full bg-gray-300"></div>
            {/* Username */}
            <div className="animate-pulse h-40 w-full relative bg-gray-300">
              <div className="animate-pulse h-20 w-20 rounded-full border-4 border-white absolute -bottom-10 left-3"></div>
            </div>
            {/* Bio */}
            <div className="animate-pulse h-6 mt-4 w-24 ml-auto rounded-full bg-gray-300"></div>
            {/* Location */}
            <div className="animate-pulse h-4 w-14 rounded-full mt-4 bg-gray-300"></div>
            {/* Website */}
            <div className="animate-pulse h-4 w-20 rounded-full bg-gray-300"></div>
            {/* Joined Date */}
            <div className="animate-pulse h-4 w-2/3 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeaderSkeleton;
