"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

function AnnouncementBar() {
  return (
    <div className="w-full bg-black py-2">
      <div className="container mx-auto flex items-center justify-center px-8">
        <span className="text-center text-sm font-medium tracking-wide text-white">
          🛒FREE SHIPPING ON ORDERS OVER $15.00 (FREE RETURUNS)
        </span>
      </div>
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      console.log("currentScrollY:", currentScrollY);
      console.log("prevScrollY:", prevScrollY);
      const scrolledUp = currentScrollY < prevScrollY;
      if (scrolledUp) {
        setIsOpen(true);
      } else if (currentScrollY > 100) {
        setIsOpen(false);
      }
      setPrevScrollY(currentScrollY);
    }
    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);
  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={`w-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <AnnouncementBar />
        <div className="w-full flex justify-between items-center py-3 sm:py-4 bg-white/60 shadow-md border-b border-green-100 backdrop-blur-xs">
          <div className="flex justify-between items-center container mx-auto px-8">
            <div className="flex flex-1 justify-start items-center gap-4 sm:gap-6">
              <button className="text-gray-700 hover:text-gray-900 md:hidden">
                <GiHamburgerMenu size={26} />
              </button>
              <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium">
                <Link href="#">Shop</Link>
                <Link href="#">New Arrival</Link>
                <Link href="#">Sale</Link>
              </nav>
            </div>

            <Link href="#">Link</Link>

            <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
              <button className="text-gray-700 hover:text-gray-900 hidden sm:block cursor-pointer">
                <IoSearch size={24} />
              </button>
              <Link href="/auth/sign-in">Sign In</Link>
              <Link href="/auth/sign-up">Sign Up</Link>
              <button className="text-gray-700 hover:text-gray-900 cursor-pointer relative">
                <IoCartOutline size={24} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
