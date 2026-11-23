"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthNavActions() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignout() {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট সফলভাবে সম্পন্ন হয়েছে!");
      router.refresh();
      router.push("/");
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  if (isPending) {
    return (
      <div className="h-9 w-28 shrink-0 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (session) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/profile"
          className="rounded-lg border border-green-700 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-50 sm:px-4 sm:text-sm"
        >
          আমার প্রোফাইল
        </Link>

        <button
          type="button"
          onClick={handleSignout}
          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700 sm:px-4 sm:text-sm"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href="/signin"
        className="rounded-lg border border-green-700 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-50 sm:px-4 sm:text-sm"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-lg bg-[#05893e] px-3 py-2 text-xs font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-sm"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
