"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const productsMenu = [
  { label: "Subscription", href: "#" },
  { label: "EX-AI Bot", href: "#" },
  { label: "Flash Loans", href: "#" },
  { label: "Zeus AI Bot", href: "#" },
  { label: "Exchange", href: "#" },
  { label: "Neo-Bank", href: "#" },
  { label: "Cards", href: "#" },
  { label: "Token", href: "#" },
];

const companyMenu = [
  { label: "About", href: "#" },
  { label: "Team", href: "#" },
  { label: "Ecosystem", href: "#" },
];


function DropdownMenu({ items, isOpen }) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 transition-all duration-300 ease-out ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none"
      }`}
      style={{
        transform: "translateX(-50%)",
      }}
    >
      {/* bridge between navbar and dropdown */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-white"
        style={{
          top: "-14px",
          width: "120px",
          height: "20px",
          borderLeft: "1px solid #ececec",
          borderRight: "1px solid #ececec",
        }}
      />

      <div
        className="bg-white relative"
        style={{
          width: "180px",
          marginTop: "0px",
          borderRadius: "0 0 18px 18px",
          border: "1px solid #ececec",
          padding: "14px 10px",
          boxShadow:
            "0 14px 40px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
        }}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-[15px] text-[#4B5563] hover:bg-[#f8fafc] hover:text-blue-600 transition-all duration-150"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative flex items-center justify-center" ref={ref}>
      {/* <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-[15px] font-medium px-1 py-1 transition-colors duration-150 ${open ? "text-blue-600" : "text-[#4b5563] hover:text-blue-600"
          }`}
      > */}
      <button
  onClick={() => setOpen((v) => !v)}
  className={`relative z-60 flex items-center gap-1 text-sm font-medium px-3 py-2 transition-all duration-150 ${
    open
      ? "text-blue-600 bg-white rounded-t-xl"
      : "text-gray-700 hover:text-blue-600"
  }`}
>
        {label}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <DropdownMenu items={items} isOpen={open} />
    </div>
  );
}

export default function Navbar() {

    const [mobileMenu, setMobileMenu] = useState(false);
    return (
        <nav
            className="w-full bg-white"
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                padding: "12px 16px",
            }}
        >
            <div
                className="mx-auto flex items-center justify-between px-4 md:px-6 bg-white"
                style={{
                    maxWidth: 1280,
                    height: 64,
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 16,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
            >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden flex items-center justify-center"
                    >
                        <svg
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#111"
                            strokeWidth="2"
                        >
                            {mobileMenu ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* LOGO */}
                    <Link href="#" className="flex items-center select-none">
          <span
              className="font-black tracking-tight text-gray-900"
              style={{ fontSize: 20, letterSpacing: "-0.03em" }}
          >
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              ▲
            </span>{" "}
              ARTEMIS ATELIER
          </span>
                    </Link>
                </div>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <NavDropdown label="Products" items={productsMenu} />

                    <NavDropdown label="Company" items={companyMenu} />

                    <Link
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                        Media Center
                    </Link>

                    <Link
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                        Contacts
                    </Link>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenu && (
                <div
                    className="md:hidden mt-3 bg-white rounded-2xl"
                    style={{
                        border: "1px solid #e5e7eb",
                        padding: "18px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <Link href="#" className="text-sm font-medium text-gray-700">
                            Home
                        </Link>

                        <div>
                            <div className="text-xs font-bold uppercase text-gray-400 mb-2">
                                Products
                            </div>

                            <div className="flex flex-col gap-2 pl-2">
                                {productsMenu.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="text-sm text-gray-600"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold uppercase text-gray-400 mb-2">
                                Company
                            </div>

                            <div className="flex flex-col gap-2 pl-2">
                                {companyMenu.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="text-sm text-gray-600"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="#" className="text-sm text-gray-700">
                            Media Center
                        </Link>

                        <Link href="#" className="text-sm text-gray-700">
                            Contacts
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
  // return (
  //   <nav
  //     className="w-full bg-white"
  //     style={{
  //         position: "sticky",
  //         top: 0,
  //         zIndex: 100,
  //         padding: "12px 16px"
  //   }}
  //   >
  //     <div
  //       className="mx-auto flex items-center justify-between px-4 md:px-6 bg-white"
  //       style={{
  //         maxWidth: 1280,
  //         height: 64,
  //         border: "1.5px solid #e2e8f0",
  //         borderRadius: 16,
  //         boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  //       }}
  //     >
  //       {/* Logo */}
  //       <Link href="#" className="flex items-center select-none">
  //         <span
  //           className="font-black tracking-tight text-gray-900"
  //           style={{ fontSize: 22, letterSpacing: "-0.03em" }}
  //         >
  //           <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
  //             ▲
  //           </span>{" "}
  //           ARTEMIS ATELIER
  //         </span>
  //       </Link>
  //
  //       {/* Nav links */}
  //       <div className="flex items-center gap-8">
  //         <Link
  //           href="#"
  //           className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-150 px-1"
  //         >
  //           Home
  //         </Link>
  //
  //         <NavDropdown label="Products" items={productsMenu}  />
  //
  //         <NavDropdown label="Company" items={companyMenu} />
  //
  //         <Link
  //           href="#"
  //           className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-150 px-1"
  //         >
  //           Media Center
  //         </Link>
  //
  //         <Link
  //           href="#"
  //           className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-150 px-1"
  //         >
  //           Contacts
  //         </Link>
  //       </div>
  //
  //       {/* Right side */}
  //       <div className="flex items-center gap-4">
  //         {/* <a
  //           href="#"
  //           className="flex items-center gap-2 text-sm font-semibold text-blue-600 border-2 border-blue-600 rounded-full px-5 py-2 hover:bg-blue-600 hover:text-white transition-all duration-200"
  //         >
  //           Dashboard
  //           <span
  //             className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-white"
  //             style={{ fontSize: 12 }}
  //           >
  //             ↗
  //           </span>
  //         </a> */}
  //
  //         {/* <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-150">
  //           EN
  //         </button> */}
  //       </div>
  //     </div>
  //   </nav>
  // );
}
