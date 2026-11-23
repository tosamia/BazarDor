"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/api";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-[#edf1ed]">
      <div className="no-scrollbar mx-auto flex max-w-[1152px] items-center gap-1 overflow-x-auto px-4 py-2 sm:gap-2">
        <Link
          href="/"
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
            pathname === "/"
              ? "bg-[#e8f5eb] text-[#05893e]"
              : "text-[#303a32] hover:bg-[#f2f7f2] hover:text-[#05893e]"
          }`}
        >
          হোম
        </Link>

        {categories.map((category) => {
          const isActive = pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                isActive
                  ? "bg-[#e8f5eb] text-[#05893e]"
                  : "text-[#303a32] hover:bg-[#f2f7f2] hover:text-[#05893e]"
              }`}
            >
              <span aria-hidden="true">{category.icon}</span>
              {category.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
