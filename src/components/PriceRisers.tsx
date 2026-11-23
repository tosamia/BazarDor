import type { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function PriceRisers({ products }: { products: Product[] }) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (risers.length === 0) return null;

  return (
    <section>
      <h2 className="mb-5 text-xl font-bold text-[#202820]">
        আজ দাম বেড়েছে <span className="text-green-700">▲</span>
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {risers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
