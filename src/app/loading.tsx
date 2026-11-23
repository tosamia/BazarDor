import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl animate-pulse px-4 py-6">
      <section className="rounded-3xl border border-[#dce8dd] bg-white px-6 py-10 sm:px-10 sm:py-14">
        <div className="h-5 w-32 rounded-full bg-gray-200" />
        <div className="mt-5 h-9 w-3/4 rounded bg-gray-200" />
        <div className="mt-3 h-9 w-1/2 rounded bg-gray-200" />
        <div className="mt-6 h-4 w-full max-w-xl rounded bg-gray-200" />
        <div className="mt-3 h-4 w-2/3 max-w-lg rounded bg-gray-200" />
        <div className="mt-7 h-11 w-44 rounded-xl bg-gray-200" />
      </section>

      {[0, 1].map((section) => (
        <section key={section} className="mt-2">
          <div className="mb-5 h-7 w-56 rounded bg-gray-200" />
          <div className="mb-2 h-4 w-72 rounded bg-gray-200" />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <ProductCardSkeleton key={`${section}-${item}`} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-2">
        <div className="mb-5 h-7 w-32 rounded bg-gray-200" />
        <div className="mb-5 h-4 w-64 rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <ProductCardSkeleton key={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
