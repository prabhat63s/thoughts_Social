import { useEffect, useRef, useState } from "react";
import { MdClose, MdImage } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import user from "../../assets/user.png";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("60px"); // Initial height

  const handleChange = (event) => {
    setText(event.target.value);
    setTextareaHeight(`${event.target.scrollHeight}px`); // Set textarea height based on content
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace" && textareaHeight !== "80px") {
        const lines = text.split("\n").length;
        setTextareaHeight(`${80 + (lines - 1) * 20}px`);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [textareaHeight, text]);

  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      setText("");
      setImg(null);
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b border-neutral-700 px-4">
      <div className="">
        <img
          src={authUser.profileImg || user}
          className="rounded-full w-10 h-9"
        />
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <textarea
          name=""
          value={text}
          onChange={handleChange}
          style={{ height: textareaHeight }}
          className="text-neutral-400 placeholder:text-xl w-full bg-transparent resize-none focus:outline-none rounded-lg px-4 py-2"
          placeholder="What are your thoughts?"
        ></textarea>
        {img && (
          <div className="relative w-full">
            <MdClose
              className="absolute top-2 right-2 text-white bg-neutral-800 hover:bg-neutral-600 p-1 rounded-full w-6 h-6 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={img}
              className="w-full min-h-40 object-cover rounded-lg"
              alt="Selected Image"
            />
          </div>
        )}
        <div className="flex items-center justify-between pt-4">
          <label htmlFor="image-upload" className="cursor-pointer">
            <MdImage
              size={24}
              className="text-neutral-400 hover:text-neutral-100"
            />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              hidden
              ref={imgRef}
              onChange={handleImgChange}
            />
          </label>
          <button
            type="submit"
            className="bg-neutral-600 text-white text-base font-semibold px-4 py-1.5 rounded-full hover:bg-neutral-700 disabled:opacity-50"
            disabled={isPending || !text.trim()}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
}
