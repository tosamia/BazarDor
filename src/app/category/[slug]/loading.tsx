
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto max-w-6xl px-4 py-8 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 h-4 w-40 rounded bg-gray-200" />

        {/* Category heading skeleton */}
        <div className="rounded-3xl border border-[#e1e8e1] bg-white p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gray-200" />

            <div className="space-y-3">
              <div className="h-7 w-32 rounded bg-gray-200" />
              <div className="h-4 w-52 rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-5 border-t border-gray-100 pt-5">
            <div className="h-5 w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Product skeletons */}
        <div className="mt-8">
          <div className="mb-5 h-6 w-40 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#e1e8e1] bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                    <div className="h-3 w-20 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="mt-5 h-6 w-32 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
