"use client";
import { BOTTOM_NAVIGATION_MENU } from "@/shared/constants/bottom-navigation.const";
import { EarnIcon } from "@/shared/ui/icons/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationIconMapper } from "./NavigationIconMapper";

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="max-w-7xl mx-auto w-full sticky bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 pt-1 pb-2">
      <div className="w-full mx-auto px-4 relative">
        <div className="flex items-end justify-around pb-2">
          {BOTTOM_NAVIGATION_MENU.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 flex-1 ${
                pathname === item.href ? "text-white" : "text-[#9DA59D]"
              }`}>
              <NavigationIconMapper className="w-6 h-6" icon={item.icon} />
              <span className="text-xs font-medium mt-0.5">{item.name}</span>
            </Link>
          ))}

          {/* Center Action Button */}
          <div className="flex-1 flex flex-col items-center relative">
            <button className="absolute -top-6 w-10 h-10 hover:bg-accent rounded-full flex items-center justify-center shadow-lg bg-[#E6F5AA] transition-colors">
              <EarnIcon className="w-8 h-8 text-black" />
            </button>
            <span className="text-xs font-medium text-[#E6F5AA] mt-6">
              Earn
            </span>
          </div>

          {BOTTOM_NAVIGATION_MENU.slice(2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 flex-1 ${
                pathname === item.href ? "text-white" : "text-gray-500"
              }`}>
              <NavigationIconMapper className="w-6 h-6" icon={item.icon} />
              <span className="text-xs font-medium mt-0.5">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
