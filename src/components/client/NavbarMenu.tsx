"use client";

import Link from "next/link";
import { useState } from "react";
import { close, logo, menu } from "@/assets";
import { navLinks } from "@/constants";

const NavbarMenu = () => {
  const [active, setActive] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const linkClass = (title: string, size: string) =>
    `${active === title ? "text-white" : "text-secondary"} hover:text-white ${size} cursor-pointer font-medium`;

  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2"
        onClick={() => {
          setActive("");
          window.scrollTo(0, 0);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
        <p className="text-[18px] font-bold text-white cursor-pointer flex">
          Nabin Thapa &nbsp;
          <span className="sm:block hidden">| Portfolio</span>
        </p>
      </Link>

      <ul className="list-none hidden sm:flex flex-row gap-10">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={linkClass(link.title, "text-[18px]")}
            onClick={() => setActive(link.title)}
          >
            <a href={`#${link.id}`}>{link.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w[140px] z-10 rounded-xl`}
        >
          <ul className="list-none flex justify-end items-start gap-4 flex-col">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${linkClass(link.title, "text-[16px]")} fonts-poppins`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(link.title);
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarMenu;
