import { useState } from "react";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import Layout from "../../components/layout/Layout";
import MobileMenu from "../../components/common/MobileMenu";

export default function HomePage() {
  const [feedType, setFeedType] = useState("forYou");
  const [isSticky] = useState(false);

  return (
    <Layout>
      <div className="w-full h-full overflow-x-hidden overflow-y-auto border-l border-r border-neutral-700">
      <div className="flex justify-between items-center p-4 border-neutral-700 border-b">
            <h1 className="text-2xl">Home</h1>
            <div className=""><MobileMenu /></div>
          </div>
        {/* create post =========================== */}
        <CreatePost />

        {/* Sticky content */}
        <div className="sticky border-b border-neutral-700 flex top-0 z-20 backdrop-blur-2xl h-14 transition-all duration-300 ease-in-out">
          <div className="flex w-full justify-between">
            <div
              className={
                "flex items-center justify-center w-full transition duration-300 cursor-pointer relative"
              }
              onClick={() => setFeedType("forYou")}
            >
              For you
              {feedType === "forYou" && (
                <div className="absolute bottom-0 w-16 border-b-4 text-white"></div>
              )}
            </div>
            <div
              className="flex items-center justify-center w-full transition duration-300 cursor-pointer relative"
              onClick={() => setFeedType("following")}
            >
              Following
              {feedType === "following" && (
                <div className="absolute bottom-0 w-16 border-b-4 text-white"></div>
              )}
            </div>
          </div>
        </div>

        {/* Non-sticky content  */}
        <div className={isSticky ? "pt-16" : "mb-20"}>
          {/* all post */}
          <Posts feedType={feedType} />
        </div>
      </div>
    </Layout>
  );
}
