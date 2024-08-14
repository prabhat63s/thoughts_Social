import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import userProfile from "../../assets/user.png";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function NotificationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Layout>
      <div className="w-full h-full overflow-x-hidden overflow-y-auto border-l border-r border-neutral-700">
        <div className="flex justify-between items-center p-4 border-b border-neutral-700">
          <p className="text-2xl">Notifications</p>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="flex items-center gap-2 focus:outline-none"
                onClick={toggleDropdown}
              >
                <BsThreeDots className="w-4" />
              </button>
            </div>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={deleteNotifications}
                  >
                    Delete all notifications
                  </a>
                  {/* Add more menu items as needed */}
                </div>
              </div>
            )}
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {notifications?.length === 0 && (
          <div className="text-center p-4 ">No notifications yet!</div>
        )}
        {notifications?.map((notification) => (
          <div className="hover:bg-neutral-600" key={notification._id}>
            <div className="flex items-center gap-4 p-4">
              <Link to={`/profile/${notification.from.username}`}>
                <div className="flex items-center gap-2">
                  <img
                    src={notification.from.profileImg || userProfile}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm flex items-center text-neutral-200 gap-1">
                    @{notification.from.username}{" "}
                    {notification.type === "follow" ? (
                      <p className="flex gap-1">
                        <span className="text-green-500 font-medium">
                          followed
                        </span>{" "}
                        you
                      </p>
                    ) : (
                      <p className="flex gap-1">
                        <span className="text-red-500 font-medium">liked</span>{" "}
                        your post
                      </p>
                    )}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
