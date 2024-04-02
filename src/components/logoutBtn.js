"use client";
import { logout } from "actions/auth";

export default function Logout() {
  return (
    <button
      className="rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-500"
      onClick={async () => await logout()}
    >
      Logout
    </button>
  );
}
