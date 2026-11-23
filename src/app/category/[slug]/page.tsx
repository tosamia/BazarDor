
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { formatBnNumber } from "@/lib/format";
import CategoryProducts from "./CategoryProducts";

export const instant = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, categoryProducts] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center text-3xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#202820]">
              {category.nameBn}
            </h1>

            <p className="mt-0.5 text-sm text-gray-500">
              {formatBnNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </section>

        <CategoryProducts products={categoryProducts} />

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-green-700 px-5 py-3 font-medium text-green-700 transition hover:bg-green-50"
        >
          ← সব পণ্যে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
