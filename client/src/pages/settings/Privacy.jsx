import Setting from "./Setting";
import { FaAngleRight, FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdBlock, MdOutlineVerifiedUser } from "react-icons/md";
import { useState } from "react";

export default function Privacy() {
  const [isBlock, setIsBlock] = useState(true);

  const toggleIsBlock = () => setIsBlock((prev) => !prev);

  return (
    <Setting>
      {isBlock ? (
        <div className="px-5 py-2">
          <h1 className="text-3xl font-bold">Privacy Settings</h1>
          <div className="mt-2">
            <button
              onClick={toggleIsBlock}
              className="w-full flex justify-between items-center p-4 hover:bg-neutral-600"
            >
              <div className="flex items-center gap-2">
                <div className="">
                  <MdBlock />
                </div>
                <p className="">Blocked Accounts</p>
              </div>
              <div className="flex items-center gap-2">
                <FaAngleRight />
              </div>
            </button>
            <Link
              to="/terms-of-use"
              className="w-full flex justify-between items-center p-4 hover:bg-neutral-600"
            >
              <div className="flex items-center gap-2">
                <div className="">
                  <MdOutlineVerifiedUser />
                </div>
                <p className="">Privacy Policy</p>
              </div>
              <div className="">
                <FaAngleRight />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="px-5 py-2">
          <h1 className="text-3xl font-bold flex items-center gap-4">
            {" "}
            <button onClick={toggleIsBlock}>
              <FaArrowLeftLong size={20} />
            </button>{" "}
            Blocked Accounts
          </h1>
          <div className="flex justify-center mt-5">
            <p className="text-neutral-400">You {"haven't"} blocked anyone.</p>
          </div>
        </div>
      )}
    </Setting>
  );
}
