"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className="my-10">
      <ul className="flex">
        <li className="flex-1 mr-2">
          <Link href="/">
            {/* <span className="text-center block border 
            
            border-blue-500 rounded py-2 px-4 bg-blue-500
            hover:bg-blue-700
             text-white"> */}
            <span
              className={`${
                path === "/" ? "navigation-active" : "navigation-non-active"
              }`}
            >
              Home
            </span>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link href="/board">
            {/* <span className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"> */}
            <span
              className={`${
                path === "/board"
                  ? "navigation-active"
                  : "navigation-non-active"
              }`}
            >
              MY NOTE
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
