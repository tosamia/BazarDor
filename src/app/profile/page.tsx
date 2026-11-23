"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function getSafeImageUrl(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function ProfileAvatar({
  image,
  name,
}: {
  image?: string | null;
  name: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = getSafeImageUrl(image);
  const showImage = src !== null && failedSrc !== src;

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#e8f3ea] ring-1 ring-inset ring-[#d7e6d9] sm:h-[70px] sm:w-[70px]">
      {showImage ? (
        <Image
          src={src}
          alt={`${name}-এর প্রোফাইল ছবি`}
          fill
          unoptimized
          sizes="70px"
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span
          role="img"
          aria-label={`${name}-এর প্রোফাইল ছবি`}
          className="flex h-full w-full items-center justify-center text-[#05893e]"
        >
          <User size={30} strokeWidth={1.75} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?callbackURL=%2Fprofile");
    }
  }, [isPending, session, router]);

  async function handleSignout() {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট সফলভাবে সম্পন্ন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  if (isPending || !session) {
    return (
      <main className="w-full overflow-x-hidden bg-white pt-[100px] pb-[204px]">
        <div className="mx-auto w-full max-w-[768px] animate-pulse px-4">
          <div className="flex flex-col gap-6 py-6">
            <div>
              <div className="h-8 w-48 rounded bg-gray-200" />
              <div className="mt-1 h-5 w-72 rounded bg-gray-200" />
            </div>

            <div className="h-[120px] rounded-2xl bg-[#fafcfa] ring-1 ring-inset ring-[#e1e8e1] p-[25px]">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-200 sm:h-[70px] sm:w-[70px]" />
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-6 w-40 rounded bg-gray-200" />
                  <div className="h-5 w-56 rounded bg-gray-200" />
                </div>
                <div className="hidden h-10 w-[118px] rounded-lg bg-gray-200 sm:block" />
              </div>
            </div>

            <div className="h-[251px] rounded-2xl bg-[#fafcfa] ring-1 ring-inset ring-[#e1e8e1] p-[21px]">
              <div className="h-7 w-16 rounded bg-gray-200" />
              <div className="mt-4 space-y-4">
                <div className="h-5 w-12 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-lg bg-gray-200" />
                <div className="h-10 w-full rounded-lg bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const displayName =
    session.user.name?.trim() || session.user.email || "ব্যবহারকারী";
  const displayEmail = session.user.email || "ইমেইল পাওয়া যায়নি";

  return (
    <main className="w-full overflow-x-hidden bg-white pt-[100px] pb-[204px]">
      <div className="mx-auto w-full max-w-[768px] px-4">
        <div className="flex flex-col gap-6 py-6">
          <header className="min-w-0">
            <h1 className="text-2xl font-bold leading-8 text-[#1d271f]">
              আমার প্রোফাইল
            </h1>
            <p className="mt-0 text-sm leading-5 text-[#1d271f]">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </header>

          <section className="flex w-full min-w-0 flex-col gap-4 rounded-2xl bg-[#fafcfa] ring-1 ring-inset ring-[#e1e8e1] p-[25px] sm:flex-row sm:items-center">
            <ProfileAvatar image={session.user.image} name={displayName} />

            <div className="min-w-0 flex-1">
              <p
                className="truncate text-xl font-normal leading-7 text-[#1d271f]"
                title={displayName}
              >
                {displayName}
              </p>
              <p
                className="mt-1 truncate text-base leading-6 text-[#1d271f]"
                title={displayEmail}
              >
                {displayEmail}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignout}
              className="flex h-10 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#d03739] px-[17px] text-sm font-semibold text-[#d03739] transition hover:bg-red-50 sm:w-auto"
            >
              <span aria-hidden="true">↩</span>
              <span>সাইন আউট</span>
            </button>
          </section>

          <section className="w-full min-w-0 rounded-2xl bg-[#fafcfa] ring-1 ring-inset ring-[#e1e8e1] p-[21px]">
            <h2 className="text-lg font-semibold leading-7 text-[#1d271f]">
              তথ্য
            </h2>

            <div className="mt-3 p-6">
              <div>
                <p className="mb-1 text-sm font-medium leading-[21px] text-[#1d271f]">
                  নাম
                </p>
                <div className="flex h-10 w-full items-center rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-[13px] text-sm leading-5 text-[#1d271f] shadow-[inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_1px_0_rgba(29,39,31,0.02)]">
                  <span className="truncate" title={displayName}>
                    {displayName}
                  </span>
                </div>
              </div>

              <Link
                href="/profile/update"
                className="mt-4 flex h-10 w-full items-center justify-center rounded-lg border border-[#047f39] bg-[#05893e] px-4 text-sm font-semibold text-[#f3fbf4] shadow-[0_4px_3px_-2px_rgba(5,137,62,0.3),0_3px_2px_-2px_rgba(5,137,62,0.3),inset_0_0.5px_0.5px_rgba(255,255,255,0.06)] transition hover:bg-[#047a34]"
              >
                আপডেট
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
