import { IoPersonOutline } from "react-icons/io5";
import Layout from "../../../../zzz/components/layout/Layout";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TfiLayoutMediaLeft } from "react-icons/tfi";
import { FaAngleRight, FaRegCircleQuestion } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import MobileMenu from "../../../../zzz/components/MobileMenu";

const settings = [
  {
    action: "Account",
    icon: <IoPersonOutline />,
    to: "/account",
  },
  {
    action: "Privacy",
    icon: <MdOutlineVerifiedUser />,
    to: "/privacy",
  },
  {
    action: "Terms of use",
    icon: <TfiLayoutMediaLeft />,
    to: "/terms-of-use",
  },
  {
    action: "FAQs",
    icon: <FaRegCircleQuestion />,
    to: "/faq",
  },
];

export default function Setting({ children }) {
  return (
    <Layout>
      <div className="h-screen w-[100%] flex">
        {/* home =========================== */}
        <div className="w-full lg:w-[40%] overflow-x-hidden overflow-y-auto border-l border-r border-neutral-700">
          <div className=" flex items-center justify-between px-5 py-3 border-neutral-700 border-b">
            <h1 className="text-3xl font-bold">Settings</h1>
            <div className="">
              <MobileMenu />
            </div>
          </div>
          <div className="w-full flex flex-col font-semibold">
            {settings.map((s, index) => (
              <NavLink
                to={s.to}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "w-full flex justify-between items-center p-4 bg-neutral-600"
                    : "w-full flex justify-between items-center p-4 hover:border-t hover:border-b border-neutral-700 hover:bg-neutral-600"
                }
              >
                <div className="flex items-center gap-2">
                  <div className="">{s.icon}</div>
                  <p className="">{s.action}</p>
                </div>
                <div className="">
                  <FaAngleRight />
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* right side =========================================== */}
        <div className="hidden lg:flex w-[50%] overflow-x-hidden overflow-y-auto">
          <main className="">{children}</main>
        </div>
      </div>
    </Layout>
  );
}
