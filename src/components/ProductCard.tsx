import Link from "next/link";
import type { Product } from "@/lib/api";
import {
  formatBnNumber,
  formatPercentage,
  getChangeVisual,
  getUnitLabel,
} from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const change = getChangeVisual(product.change.dir);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full min-h-[138px] flex-col rounded-xl border border-[#e1e8e1] bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
          {product.image || product.categoryIcon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6 text-[#202820] transition group-hover:text-green-800">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            প্রতি {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-0.5 whitespace-nowrap text-xl font-bold leading-7 text-[#202820]">
            {formatBnNumber(product.today)}{" "}
            <span className="text-sm font-medium text-gray-500">টাকা</span>
          </p>
        </div>

        <span
          className={`flex h-6 shrink-0 items-center rounded-full px-2 text-xs font-semibold ${change.badgeClass}`}
          title={change.label}
        >
          {change.arrow} {formatPercentage(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}
