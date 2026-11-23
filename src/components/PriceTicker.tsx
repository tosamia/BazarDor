import type { Product } from "@/lib/api";
import {
  formatBnNumber,
  formatPercentage,
  getChangeVisual,
  getUnitLabel,
} from "@/lib/format";

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="overflow-hidden border-t border-[#e1e8e1] bg-[#fafcf9]">
      <div className="animate-marquee flex w-max items-center">
        {tickerItems.map((product, index) => {
          const change = getChangeVisual(product.change.dir);

          return (
            <div
              key={`${product.id}-${index}`}
              aria-hidden={index >= products.length}
              className="flex items-center gap-2 border-r border-[#e8eee8] px-5 py-2.5 text-xs"
            >
              <span aria-hidden="true">{product.image}</span>
              <span className="font-medium text-[#263329]">
                {product.nameBn}
              </span>
              <span className="text-gray-500">
                {formatBnNumber(product.today)} টাকা/{getUnitLabel(product.unit)}
              </span>
              <span className={`font-semibold ${change.textClass}`}>
                {change.arrow} {formatPercentage(product.change.pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
