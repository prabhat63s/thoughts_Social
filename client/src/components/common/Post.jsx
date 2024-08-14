/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";
import user from "../../assets/user.png";
import { BsChat } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdClose, MdOutlineShare } from "react-icons/md";

export default function Post({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  //  open modal
  const openModal = (postId) => {
    setIsOpen(postId);
  };

  //  close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  const [comment, setComment] = useState("");
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser?._id);

  const isMyPost = authUser?._id === post.user._id;

  const formattedDate = formatPostDate(post.createdAt);

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: "DELETE",
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
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/like/${post._id}`, {
          method: "POST",
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
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldData) => {
        return oldData.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/comment/${post._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: comment }),
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
      toast.success("Comment posted successfully");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeletePost = () => {
    deletePost();
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost();
  };

  const handleLikePost = () => {
    if (isLiking) return;
    likePost();
  };

  return (
    <div>
      <div className="flex gap-2 items-start p-4 border-b border-neutral-700">
        <div className="">
          <Link to={`/profile/${postOwner.username}`}>
            <img
              src={postOwner.profileImg || user}
              alt=""
              className="rounded-full h-10 w-10"
            />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner.username}`} className="">
              {postOwner.fullName}
            </Link>
            <span className="text-slate-500 font-bold">·</span>
            <span className="text-slate-500 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
              <span className="text-slate-500 font-bold">·</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1 text-slate-500">
                {!isDeleting && (
                  <FaTrash
                    className="cursor-pointer text-sm hover:text-white"
                    onClick={handleDeletePost}
                  />
                )}

                {isDeleting && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <p className="text-sm pr-2 leading-6 text-neutral-50">{post.text}</p>
            {post.img && (
              <img
                src={post.img}
                className="h-80 object-contain rounded-lg border border-neutral-700"
                alt=""
              />
            )}
          </div>

          <div className="flex mt-2">
            <div className="flex gap-4 items-center">
              {/* comment post */}
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() => openModal(post._id)}
              >
                <BsChat
                  size={18}
                  className="text-neutral-400 group-hover:text-sky-400"
                />
                <span className="text-neutral-400 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>

              {/* like post */}
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleLikePost}
              >
                {isLiking && <LoadingSpinner size="sm" />}
                {!isLiked && !isLiking && (
                  <IoHeartOutline
                    size={20}
                    className="cursor-pointer text-neutral-400 group-hover:text-red-500"
                  />
                )}
                {isLiked && !isLiking && (
                  <IoHeartSharp
                    size={20}
                    className="cursor-pointer text-red-500"
                  />
                )}

                <span
                  className={`group-hover:text-red-500 ${
                    isLiked ? "text-red-500" : "text-neutral-400"
                  }`}
                >
                  {post.likes.length}
                </span>
              </div>

              {/* share post */}
              <div className="flex gap-1 items-center group cursor-pointer">
                <MdOutlineShare
                  size={18}
                  className="text-neutral-400 group-hover:text-green-500"
                />
                <span className="text-neutral-400 group-hover:text-green-500">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="w-[350px] md:w-[550px] lg:w-[600px] text-white bg-gradient-to-bl from-neutral-950 to-neutral-700 p-4 rounded-lg shadow-md">
            <div
              className="flex justify-between"
              id={`comments_modal${post._id}`}
            >
              <p className="text-lg">Write Post</p>
              <button className="hover:text-neutral-400" onClick={closeModal}>
                <MdClose />
              </button>
            </div>
            <div className="modal-box rounded border p-4 mt-2 border-neutral-700">
              <h1 className="text-lg">Comment</h1>
              <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                {post.comments.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No comments yet! Be the first one.
                  </p>
                )}
                {post.comments.map((comment) => (
                  <div key={comment._id} className="flex gap-2 items-start">
                    <div className="">
                      <div>
                        <img
                          src={comment.user.profileImg || user}
                          className="rounded-full h-8 w-8"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="">{comment.user.fullName}</span>
                        <span className="text-neutral-400 text-sm">
                          @{comment.user.username}
                        </span>
                      </div>
                      <div className="text-sm">{comment.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form
                className="flex gap-2 items-center mt-4"
                onSubmit={handlePostComment}
              >
                <textarea
                  className="textarea w-full p-1 bg-transparent rounded text-md resize-none border focus:outline-none  border-neutral-700"
                  placeholder="Add a comment..."
                  value={comment}
                  rows={3}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="bg-neutral-600 rounded-full text-white px-4 py-2">
                  {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
