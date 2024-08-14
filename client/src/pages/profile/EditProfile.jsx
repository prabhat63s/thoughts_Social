/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import { MdClose } from "react-icons/md";

export default function EditProfile({ authUser }) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [authUser]);

  return (
    <>
      <button
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal">
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-950 bg-opacity-60">
          <div className="modal-box border rounded-md border-neutral-700 bg-gradient-to-bl from-neutral-950 to-neutral-700 tracking-wide p-5 text-white">
            <div className="flex justify-between">
              <h3 className="text-lg pb-4">Update Profile</h3>
              <form method="dialog">
                <button className="bg-neutral-800 p-1 rounded-md hover:bg-neutral-700">
                  <MdClose />
                </button>
              </form>
            </div>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile(formData);
              }}
            >
              <div className="flex flex-wrap gap-2 ">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="flex-1 input border bg-transparent border-neutral-700 rounded p-2 input-md"
                  value={formData.fullName}
                  name="fullName"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="flex-1 input border bg-transparent border-neutral-700 rounded p-2 input-md"
                  value={formData.username}
                  name="username"
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="flex-1 input border bg-transparent  border-neutral-700 rounded p-2 input-md"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Bio"
                className="flex-1 input border bg-transparent  border-neutral-700 rounded p-2 input-md"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
              />
              <div className="flex flex-wrap gap-2 ">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="flex-1 input border bg-transparent border-neutral-700 rounded p-2 input-md"
                  value={formData.currentPassword}
                  name="currentPassword"
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="flex-1 input border bg-transparent border-neutral-700 rounded p-2 input-md"
                  value={formData.newPassword}
                  name="newPassword"
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="text"
                placeholder="Link"
                className="flex-1 input border bg-transparent  border-neutral-700 rounded p-2 input-md"
                value={formData.link}
                name="link"
                onChange={handleInputChange}
              />
              <button className=" rounded-md p-1 bg-white hover:opacity-70 text-black">
                {isUpdatingProfile ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
