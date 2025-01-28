import React from "react";
import Link from "next/link";

const Breadcrumb = ({categoryName}) => {
  return (
    <nav aria-label="breadcrumb" className="p-4 rounded-lg">
      <ol className="flex space-x-2 text-gray-600">
        <li>
          <Link href="/" className="hover:underline text-blue-600">
            Home
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <span className="text-gray-600">{categoryName || "Category"}</span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
