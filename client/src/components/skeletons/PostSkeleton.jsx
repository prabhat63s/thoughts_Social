const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex gap-4 items-center">
        <div className="animate-pulse w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex gap-2">
          <div className="animate-pulse h-4 w-12 rounded-full bg-gray-300"></div>
          <div className="animate-pulse h-4 w-24 rounded-full bg-gray-300"></div>
          <div className="animate-pulse h-4 w-10 rounded-full bg-gray-300"></div>
        </div>
      </div>
      <div className="animate-pulse h-40 w-full bg-gray-300 rounded-lg"></div>
      <div className="animate-pulse h-10 w-full bg-gray-300 rounded-lg"></div>
    </div>
  );
};
export default PostSkeleton;
