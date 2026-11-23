import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "পেজ পাওয়া যায়নি | বাজার দর",
  description: "আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center px-4 py-16">
      <div className="w-full rounded-3xl border border-[#e1e8e1] bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-5xl" aria-hidden="true">
          🔍
        </p>

        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-green-700">
          404
        </p>

        <h1 className="mt-2 text-2xl font-bold text-[#202820] sm:text-3xl">
          এই পেজটি পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          পণ্য বা ক্যাটাগরির লিংকটি ভুল হতে পারে অথবা চেয়ে থাকা তথ্যটি
          বর্তমানে উপলব্ধ নেই। হোম পেজ থেকে আবার খুঁজে দেখুন।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#05893e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#047235]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
