"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?callbackURL=%2Fprofile%2Fupdate");
    }
  }, [isPending, session, router]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = (name ?? "").trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      await refetch();
      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
        <div className="w-full max-w-[646px] animate-pulse rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="mt-8 h-7 w-56 rounded bg-gray-200" />
          <div className="mt-8 space-y-4">
            <div className="h-12 rounded-lg bg-gray-100" />
            <div className="h-12 rounded-lg bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-[646px] rounded-2xl border border-[#e1e8e1] bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/profile"
          className="text-sm text-gray-500 transition hover:text-black"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>

        <div className="mt-10 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            তথ্য হালনাগাদ করুন
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার প্রোফাইলে দেখানো নাম সংশোধন করুন।
          </p>
        </div>

        <form onSubmit={handleUpdate} className="mt-7 space-y-6">
          <div>
            <label
              htmlFor="update-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              আপনার নাম
            </label>
            <input
              id="update-name"
              type="text"
              value={name ?? session.user.name ?? ""}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              placeholder="আপনার নাম লিখুন"
              className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900"
            />
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

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-md bg-gray-900 px-5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট ইনফরমেশন"}
          </button>
        </form>
      </div>
    </main>
  );
}
