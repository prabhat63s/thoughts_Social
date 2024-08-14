import { Link } from "react-router-dom";
import ui from "../../assets/ui.png";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");

      {
        /* Added this line below, after recording the video. I forgot to add this while recording, sorry, thx. */
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // page won't reload
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full flex flex-row items-center justify-center h-screen px-6">
      <div className="lg:w-1/2 hidden lg:flex justify-center ">
        <img src={ui} alt="" className="w-[500px]" />
      </div>
      <div className="w-full max-w-sm mx-auto text-neutral-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-2xl font-medium ">Sign up to our platform</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium ">
              Your email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              className="bg-neutral-800  border border-neutral-700  text-sm rounded-lg block w-full p-2.5"
              placeholder="name@company.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="text" className="block mb-2 text-sm font-medium ">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
              className="bg-neutral-800 border border-neutral-700  text-sm rounded-lg block w-full p-2.5"
              placeholder="prabhatsingh@12"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="text" className="block mb-2 text-sm font-medium ">
              Your name
            </label>
            <input
              type="text"
              name="fullName"
              onChange={handleInputChange}
              value={formData.fullName}
              className="bg-neutral-800 border border-neutral-700 text-sm rounded-lg block w-full p-2.5"
              placeholder="Prabhat Singh"
              autoComplete="name"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium "
            >
              Your password
            </label>
            <div className="flex items-center bg-neutral-800  border border-neutral-700  text-sm rounded-lg w-full p-2.5">
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                placeholder="••••••••"
                className="w-full outline-none bg-transparent"
                autoCapitalize="current-password"
              />
              {isShowPassword ? (
                <FaRegEye
                  size={18}
                  onClick={() => toggleShowPassword()}
                  className="text-neutral-200"
                />
              ) : (
                <FaRegEyeSlash
                  size={18}
                  onClick={() => toggleShowPassword()}
                  className="text-neutral-200"
                />
              )}
            </div>
          </div>
          {isError && <p className="text-red-500 text-xs">{error.message}</p>}
          <button
            type="submit"
            className="bg-neutral-50 text-black w-full p-2 rounded-md border-neutral-700 hover:bg-neutral-200"
          >
            {isPending ? "Loading..." : "Sign up to your account"}
          </button>
          <div className="text-sm ">
            Already registered?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
