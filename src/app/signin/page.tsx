"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthRedirectToast from "@/components/AuthRedirectToast";
import AuthShell from "@/components/AuthShell";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(
    null
  );
  const [error, setError] = useState("");

  function getCallbackURL() {
    const params = new URLSearchParams(window.location.search);
    const callbackURL = params.get("callbackURL");

    if (
      callbackURL &&
      callbackURL.startsWith("/") &&
      !callbackURL.startsWith("//")
    ) {
      return callbackURL;
    }

    return "/";
  }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        const message = result.error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল।";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("সাইন ইন সফলভাবে সম্পন্ন হয়েছে!");
      router.push(getCallbackURL());
      router.refresh();
    } catch {
      const message = "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialLogin(provider: SocialProvider) {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: getCallbackURL(),
      });

      if (result.error) {
        const message = result.error.message || "সোশ্যাল লগইন করা যায়নি।";
        setError(message);
        toast.error(message);
      }
    } catch {
      const message = "এই লগইন পদ্ধতিটি এখনো কনফিগার করা হয়নি।";
      setError(message);
      toast.error(message);
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <AuthShell page="signin">
      <AuthRedirectToast />

      <section className="w-full max-w-[416px]">
        <div className="mb-5 text-center">
          <h1 className="text-[24px] font-bold text-[#26352b]">
            সাইন ইন করুন
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করতে নিচের তথ্য দিন
          </p>
        </div>

        <div className="rounded-[12px] border border-[#e8eee9] bg-white px-6 py-7 shadow-sm">
          <form onSubmit={handleSignin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold">
                ইমেইল
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-[40px] w-full rounded-md border border-[#e1e8e2] bg-white px-3 text-sm outline-none transition focus:border-[#008c45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড"
                className="h-[40px] w-full rounded-md border border-[#e1e8e2] bg-white px-3 text-sm outline-none transition focus:border-[#008c45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-[11px] text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="h-[40px] w-full rounded-md bg-[#008c45] text-sm font-semibold text-white transition hover:bg-[#00783b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading || socialLoading !== null}
              className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-[#e1e8e2] text-[11px] font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={loading || socialLoading !== null}
              className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-[#e1e8e2] text-[11px] font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="font-bold text-gray-800">●</span>
              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#008c45] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </section>
    </AuthShell>
  );
}
