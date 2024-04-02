"use client";
import { useState } from "react";

export default function PublishBtn({ exam, subject, action }) {
  const [isPublished, setIsPublished] = useState(false);
  return (
    <button
      className="rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-500"
      onClick={async () => {
        const res = await action(exam, subject);
        setIsPublished(res.success);
      }}
    >
      {isPublished ? "Published" : "Publish"}
    </button>
  );
}
