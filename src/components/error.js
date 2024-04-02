"use client";
import Error from "next/error";

export default function ErrorComponent({ statusCode, message }) {
  return <Error statusCode={statusCode} title={message} />;
}
