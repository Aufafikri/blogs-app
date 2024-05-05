"use client";

import { FormData } from "@/types/blogs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const FormNewPost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const { data } = useSession();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/posts", formData);
      if (response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className="w-full border py-2 px-3 border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
          placeholder="enter the title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 border">
        <ReactTextareaAutosize
          minRows={5}
          name="content"
          className="w-full border py-2 px-3 border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
          placeholder="enter the title"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <button
      disabled={!data?.user?.email}
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
      >
        Submit
      </button>
    </form>
  );
};

export default FormNewPost;
