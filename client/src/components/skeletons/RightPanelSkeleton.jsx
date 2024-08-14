const RightPanelSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full p-4">
        <div className="flex gap-2 items-center">
          {/* Profile Image */}
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          {/* User Info */}
          <div className="flex flex-1 justify-between">
            <div className="flex flex-col gap-1">
              {/* Full Name */}
              <div className="h-4 w-32 rounded-full bg-gray-300"></div>
              {/* Username */}
              <div className="h-4 w-28 rounded-full bg-gray-300"></div>
            </div>
            {/* Follow Button */}
            <div className="h-6 w-14 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
  );
};

export default RightPanelSkeleton;
