"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Market",
      href: "/market",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Portfolio",
      href: "/portfolio",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Points",
      href: "/points",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-20">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 flex-1 ${
                pathname === item.href ? "text-white" : "text-gray-500"
              }`}>
              {item.icon}
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}

          {/* Center Action Button */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-1">
            <button className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center -mt-2 shadow-lg hover:bg-yellow-500 transition-colors">
              <svg
                className="w-7 h-7 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <span className="text-xs font-medium text-white">Earn</span>
          </div>

          {navItems.slice(2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 flex-1 ${
                pathname === item.href ? "text-white" : "text-gray-500"
              }`}>
              {item.icon}
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
