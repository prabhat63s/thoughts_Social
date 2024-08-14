import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { BsChatDots } from "react-icons/bs";
import MobileMenu from "../components/common/MobileMenu";

export default function Message() {
  return (
    <Layout>
      <div className="h-screen w-[100%] flex">
        <div className="w-full overflow-x-hidden overflow-y-auto border-l border-r border-neutral-700">
          <div className="flex justify-between items-center p-4 border-neutral-700 border-b">
            <h1 className="text-2xl ">Messages</h1>
            <div className=""><MobileMenu /></div>
          </div>
          <div className="h-full gap-3 text-center flex items-center justify-center flex-col">
            <div className="bg-neutral-700 p-4 rounded-full ">
              <BsChatDots size={30} />
            </div>
            <h1 className="text-lg font-semibold">No message requests</h1>
            <p className="text-slate-400 text-sm">
              To get started with this feature, you'll need to add credits to
              your profile.
            </p>
            <Link
              to="/explore"
              className="bg-white text-black text-lg font-medium px-6 py-1 rounded-full hover:bg-neutral-400"
            >
              Start message
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
