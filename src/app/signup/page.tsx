"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(
    null
  );
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      const message = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setError(message);
      toast.error(message);
      return;
    }

    if (password !== confirmPassword) {
      const message = "দুটি পাসওয়ার্ড মিলছে না।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        const message = result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      router.push("/signin");
      router.refresh();
    } catch {
      const message = "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignup(provider: SocialProvider) {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        const message = result.error.message || "সোশ্যাল সাইন আপ করা যায়নি।";
        setError(message);
        toast.error(message);
      }
    } catch {
      const message = "সোশ্যাল লগইন কনফিগারেশন পরীক্ষা করুন।";
      setError(message);
      toast.error(message);
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <AuthShell page="signup">
      <section className="w-full max-w-[416px]">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-[#26352b]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            নিজের অ্যাকাউন্ট তৈরি করে বাজার দর সম্পর্কে জানুন
          </p>
        </div>

        <div className="rounded-xl border border-[#e8eee9] bg-white px-6 py-7 shadow-sm">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold">নাম</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার পুরো নাম"
                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">ইমেইল</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
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
                placeholder="পাসওয়ার্ড দিন"
                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবার লিখুন"
                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-green-600"
              />
            </div>

            {error && (
              <p className="rounded-md bg-red-50 p-2 text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="h-10 w-full rounded-md bg-[#008c45] text-sm font-semibold text-white hover:bg-[#00783b] disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
              onClick={() => handleSocialSignup("google")}
              disabled={loading || socialLoading !== null}
              className="flex h-10 items-center justify-center rounded-md border border-gray-200 text-[11px] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup("github")}
              disabled={loading || socialLoading !== null}
              className="flex h-10 items-center justify-center rounded-md border border-gray-200 text-[11px] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-green-700">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </section>
    </AuthShell>
  );
}
