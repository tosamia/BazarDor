"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";
import { formatBnNumber } from "@/lib/format";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortOrder === "low-to-high") {
      sorted.sort((a, b) => a.today - b.today);
    } else if (sortOrder === "high-to-low") {
      sorted.sort((a, b) => b.today - a.today);
    }

    return sorted;
  }, [products, sortOrder]);

  return (
    <section className="pb-10">
      <div className="mb-5 flex justify-end">
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-products"
            className="whitespace-nowrap text-sm text-gray-600"
          >
            সাজান:
          </label>

          <div className="relative">
            <select
              id="sort-products"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="appearance-none rounded-lg border border-[#e1e8e1] bg-white py-2 pl-3 pr-9 text-sm text-[#202820] outline-none focus:border-green-600"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              ▾
            </span>
          </div>
        </div>
      </div>

      <p className="mb-5 text-sm text-gray-500">
        মোট {formatBnNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-[#e1e8e1] bg-white p-10 text-center">
          <p className="text-4xl">🛒</p>

          <h3 className="mt-4 font-semibold text-[#202820]">
            কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            এই বিভাগে বর্তমানে কোনো পণ্যের তথ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-[#05893e] px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
