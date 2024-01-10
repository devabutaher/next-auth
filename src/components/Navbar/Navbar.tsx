"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "User", href: "/user" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const handleLogout = async () => {
    const res = await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
    });
    const user = await res.json();

    console.log("user:", user);
  };

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
      <button className="link-style" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
