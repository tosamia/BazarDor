"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
        <div className="w-full max-w-[768px] animate-pulse rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="mt-8 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="h-4 w-56 rounded bg-gray-200" />
            </div>
          </div>
          <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
            <div className="h-12 rounded-lg bg-gray-100" />
            <div className="h-12 rounded-lg bg-gray-100" />
            <div className="h-12 rounded-lg bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-[768px] rounded-2xl border border-[#e1e8e1] bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/"
          className="text-sm text-gray-500 transition hover:text-black"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="mt-10 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xl font-semibold text-gray-700">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                আমার প্রোফাইল
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                আপনার অ্যাকাউন্টের তথ্য পরিচালনা করুন।
              </p>
            </div>
          </div>
        </div>

        <section className="py-7">
          <h2 className="text-sm font-semibold text-gray-900">
            ব্যক্তিগত তথ্য
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="mb-2 block text-sm font-medium text-gray-700">
                আপনার নাম
              </p>
              <div className="flex h-12 items-center rounded-md border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900">
                {session.user.name || "নাম সেট করা হয়নি"}
              </div>
            </div>

            <div>
              <p className="mb-2 block text-sm font-medium text-gray-700">
                ইমেইল ঠিকানা
              </p>
              <div className="flex h-12 items-center rounded-md border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500">
                {session.user.email}
              </div>
              <p className="mt-2 text-xs text-gray-400">
                ইমেইল ঠিকানা পরিবর্তন করা যাবে না।
              </p>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="mt-7 flex h-12 w-full items-center justify-center rounded-md bg-gray-900 px-5 text-sm font-medium text-white transition hover:bg-black"
          >
            তথ্য হালনাগাদ করুন
          </Link>
        </section>

        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-sm font-semibold text-gray-900">অ্যাকাউন্ট</h2>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্ট থেকে সাইন আউট করুন।
          </p>

          <button
            type="button"
            onClick={handleSignout}
            className="mt-4 h-11 w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            সাইন আউট
          </button>
        </section>
      </div>
    </main>
  );
}
