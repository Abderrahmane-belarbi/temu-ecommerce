"use client";

import Form from "next/form";
import { IoSearchSharp } from "react-icons/io5";

export default function HeaderSearchBar() {
  return (
    <Form action="/search">
      <div className="relative">
        <div className="absolute insert-y-0 left-0 top-2 pl-2 flex items-center pointer-events-none">
          <IoSearchSharp size={16} className="h-4 w-4 text-gray-400"/>
        </div>
        <input
          type="text"
          name="query"
          placeholder="Search..."
          className="w-32 pl-8 pr-2 py-1 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-black
          focus:border-transparent transition-colors"
        />
      </div>
    </Form>
  );
}
