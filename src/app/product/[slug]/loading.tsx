export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[1152px] animate-pulse px-4 py-7 sm:py-9">
      <div className="mb-6 flex gap-2">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-4 w-4 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-4 rounded bg-gray-200" />
        <div className="h-4 w-28 rounded bg-gray-200" />
      </div>

      <section className="flex min-h-[174px] flex-col gap-5 rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:flex-row sm:px-8">
        <div className="flex w-full items-center gap-5">
          <div className="h-20 w-20 shrink-0 rounded-2xl bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-24 rounded-full bg-gray-200" />
            <div className="h-7 w-56 rounded bg-gray-200" />
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-4 w-48 rounded bg-gray-200" />
          </div>
        </div>
        <div className="h-24 w-full rounded-xl bg-gray-200 sm:w-[220px]" />
      </section>

      <section className="mt-6">
        <div className="mb-4 h-6 w-48 rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-[102px] rounded-xl bg-gray-200" />
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-2xl border border-[#e1e8e1] bg-white p-5 sm:p-7">
        <div className="h-6 w-52 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-72 rounded bg-gray-200" />
        <div className="mt-6 space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-12 rounded bg-gray-100" />
          ))}
        </div>
      </section>
    </main>
  );
}
