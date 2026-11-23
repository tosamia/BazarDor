import type { Product } from "@/lib/api";
import { formatBnNumber } from "@/lib/format";
import ProductCard from "./ProductCard";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section id="সব-পণ্য" className="scroll-mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#202820]">সব পণ্য</h2>
        <p className="mt-1 text-sm text-gray-500">
          মোট {formatBnNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
