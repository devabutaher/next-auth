"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="bg-gray-950 p-6 flex items-center justify-center gap-6">
      {links.map((link, i) => (
        <Link
          href={link.href}
          key={i}
          className={`link-style  ${
            pathname === link.href && "border-b-2 border-orange-600"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
