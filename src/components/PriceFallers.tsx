import type { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function PriceFallers({ products }: { products: Product[] }) {
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section>
      <h2 className="mb-5 text-xl font-bold text-[#202820]">
        আজ দাম কমেছে <span className="text-red-600">▼</span>
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fallers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
