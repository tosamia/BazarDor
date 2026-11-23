import Link from "next/link";
import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/api";
import AuthNavActions from "./AuthNavActions";
import CategoryNav from "./CategoryNav";
import DynamicDate from "./DynamicDate";
import PriceTicker from "./PriceTicker";

export default async function Navbar() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e1e8e1] bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1152px] px-4">
        <div className="flex h-[68px] items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#05893e] text-xl text-white">
              <span aria-hidden="true">🛒</span>
            </span>

            <span className="min-w-0">
              <span className="block truncate text-lg font-bold text-[#17251c]">
                বাজার দর
              </span>
              <Suspense
                fallback={
                  <span className="block text-[11px] text-gray-400">
                    তারিখ লোড হচ্ছে
                  </span>
                }
              >
                <DynamicDate />
              </Suspense>
            </span>
          </Link>

          <AuthNavActions />
        </div>

        <CategoryNav categories={categories} />
      </div>

      <PriceTicker products={products} />
    </header>
  );
}
