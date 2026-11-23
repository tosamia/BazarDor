export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#e1e8e1] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-5 w-28 rounded bg-gray-200" />
        </div>
        <div className="h-6 w-16 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
