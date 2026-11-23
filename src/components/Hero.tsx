import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import DynamicDate from "./DynamicDate";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#dce8dd] bg-[#f3fbf4] px-6 py-8 sm:px-6 lg:grid lg:grid-cols-[1fr_315px] lg:items-center lg:gap-8 lg:px-4">
      <div>
        <Suspense
          fallback={
            <span className="text-sm font-medium text-[#05893e]">
              আজকের বাজার দর
            </span>
          }
        >
          <DynamicDate className="text-sm font-medium text-[#05893e]" />
        </Suspense>

        <h1 className="mt-4 text-3xl font-bold leading-[1.2] text-[#1d271f] sm:text-[36px]">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 max-w-[640px] text-base leading-7 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div className="mt-6">
          <Link
            href="#সব-পণ্য"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047235]"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true" className="ml-2">
              ↓
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-6 flex justify-center lg:mt-0 lg:justify-end">
        <Image
          src="/bazar-hero.png"
          alt="বাজার দর দেখানোর জন্য কেনাকাটার চিত্র"
          width={315}
          height={263}
          priority
          className="h-auto w-full max-w-[315px] object-contain"
        />
      </div>
    </section>
  );
}
