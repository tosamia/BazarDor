
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getProductBySlug } from "@/lib/api";
import { auth } from "@/lib/auth";

export const instant = false;

const numberFormat = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

function price(value: number) {
  return numberFormat.format(value);
}

function percentage(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(value));
}

function unitLabel(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    dozen: "ডজন",
    litre: "লিটার",
    piece: "পিস",
  };

  return units[unit] || unit;
}

function PriceSummary({
  title,
  value,
  description,
  color,
}: {
  title: string;
  value: number;
  description: string;
  color: "green" | "red";
}) {
  return (
    <div className="flex min-h-[102px] flex-col justify-center rounded-xl border border-[#e1e8e1] bg-white px-5 py-4">
      <p className="text-sm text-gray-500">{title}</p>

      <p
        className={`mt-1 text-2xl font-bold ${
          color === "green" ? "text-[#05893e]" : "text-red-500"
        }`}
      >
        {price(value)} টাকা
      </p>

      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  );
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check the user's actual Better Auth session.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Protect this page: visitors must sign in first.
  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets || [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const avgPrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  const changeColor =
    product.change.dir === "up"
      ? "text-green-600"
      : product.change.dir === "down"
        ? "text-red-500"
        : "text-gray-500";

  const changeLabel =
    product.change.dir === "up"
      ? "দাম বেড়েছে"
      : product.change.dir === "down"
        ? "দাম কমেছে"
        : "দাম অপরিবর্তিত";

  return (
    <main className="min-h-screen bg-[#f0f5f0] text-[#202820]">
      <div className="mx-auto max-w-[1152px] px-4 py-7 sm:py-9">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-[#05893e]">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-[#05893e]"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-medium text-[#202820]">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <section className="flex min-h-[174px] flex-col items-center justify-between gap-5 rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:flex-row sm:px-10">
          <div className="flex w-full items-center gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <span className="inline-flex rounded-full bg-[#eaf5ec] px-3 py-1 text-xs font-semibold text-[#05893e]">
                {product.categoryIcon} {product.categoryNameBn}
              </span>

              <h1 className="mt-2 text-2xl font-bold sm:text-[30px]">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitLabel(product.unit)}
              </p>

              <p className={`mt-2 text-sm font-semibold ${changeColor}`}>
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {changeLabel} {percentage(product.change.pct)}%
                <span className="ml-1 font-normal text-gray-400">
                  (গতকালের তুলনায়)
                </span>
              </p>
            </div>
          </div>

          <div className="w-full shrink-0 rounded-xl bg-[#f0f7f0] px-8 py-4 text-center sm:w-[220px]">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-[30px] font-bold text-[#05893e]">
              {price(product.today)}
            </p>

            <p className="text-sm text-gray-500">
              টাকা / {unitLabel(product.unit)}
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>

            <span className="text-xs text-gray-400">
              টাকা / {unitLabel(product.unit)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PriceSummary
              title="সর্বনিম্ন দাম"
              value={minPrice}
              description="সবচেয়ে কম দামের বাজার"
              color="green"
            />

            <PriceSummary
              title="সর্বাধিক দাম"
              value={maxPrice}
              description="সবচেয়ে বেশি দামের বাজার"
              color="red"
            />

            <PriceSummary
              title="গড় দাম"
              value={avgPrice}
              description={`প্রতি ${unitLabel(product.unit)}-এর হিসাবে`}
              color="green"
            />
          </div>
        </section>

        {/* Market Prices */}
        <section className="mt-7 rounded-2xl border border-[#e1e8e1] bg-white p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>

              <p className="mt-1 text-sm text-gray-500">
                বিভিন্ন বাজারে {product.nameBn}-এর আজকের দাম
              </p>
            </div>

            <span className="text-sm text-gray-500">
              মোট {price(markets.length)}টি বাজার
            </span>
          </div>

          <div className="mt-5 overflow-x-auto">
            {markets.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                বাজারের তথ্য পাওয়া যায়নি।
              </p>
            ) : (
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e6ece6] bg-[#f5f8f5] text-gray-500">
                    <th className="px-4 py-3 font-semibold">বাজার</th>
                    <th className="px-4 py-3 font-semibold">বিভাগ</th>
                    <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                    <th className="px-4 py-3 font-semibold">সর্বোচ্চ</th>
                    <th className="px-4 py-3 font-semibold">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-[#edf1ed] transition last:border-0 hover:bg-[#f8faf8]"
                      >
                        <td className="px-4 py-3 font-semibold text-[#263329]">
                          {market.market}
                        </td>

                        <td className="px-4 py-3 text-gray-500">
                          {market.division}
                        </td>

                        <td className="px-4 py-3 font-semibold text-[#05893e]">
                          {price(market.min)} টাকা
                        </td>

                        <td className="px-4 py-3 font-semibold text-red-500">
                          {price(market.max)} টাকা
                        </td>

                        <td className="px-4 py-3 font-semibold text-[#263329]">
                          {price(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Price History */}
        <section className="mt-7 rounded-2xl border border-[#e1e8e1] bg-white p-5 sm:p-7">
          <h2 className="text-xl font-bold">দামের ইতিহাস</h2>

          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              { label: "আজ", value: product.today },
              { label: "গতকাল", value: product.yesterday },
              { label: "গত সপ্তাহ", value: product.lastWeek },
              { label: "গত মাস", value: product.lastMonth },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm text-gray-500">{item.label}</p>

                <p className="mt-2 text-xl font-bold">
                  {price(item.value)} টাকা
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="py-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#05893e] px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
