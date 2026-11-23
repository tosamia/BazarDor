"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "./UserAvatar";

export default function AuthNavActions() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  async function handleSignout() {
    closeMenu();

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
      <div className="h-10 w-28 shrink-0 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (session) {
    const displayName =
      session.user.name?.trim() || session.user.email || "ব্যবহারকারী";

    return (
      <div className="relative shrink-0" ref={menuRef}>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          aria-controls="user-dropdown-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 max-w-[160px] items-center gap-2 rounded-lg px-3 text-[#1d271f] transition hover:bg-[#f2f7f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893e] sm:max-w-none sm:px-[17px]"
        >
          <UserAvatar image={session.user.image} name={displayName} />

          <span className="truncate text-sm font-medium" title={displayName}>
            {displayName}
          </span>

          <ChevronDown
            size={12}
            strokeWidth={2}
            aria-hidden="true"
            className={`shrink-0 text-[#1d271f]/60 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isMenuOpen && (
          <div
            id="user-dropdown-menu"
            role="menu"
            aria-label="ব্যবহারকারী মেনু"
            className="animate-dropdown-in absolute right-0 top-[calc(100%+8px)] z-50 w-[min(256px,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl bg-[#fafcfa] p-[9px] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] ring-1 ring-inset ring-[#e1e8e1]"
          >
            <div className="px-3 py-2">
              <p
                className="truncate text-sm leading-5 text-[#1d271f]"
                title={displayName}
              >
                {displayName}
              </p>

              {session.user.email && (
                <p
                  className="mt-0.5 truncate text-xs leading-4 text-[#1d271f]/70"
                  title={session.user.email}
                >
                  {session.user.email}
                </p>
              )}
            </div>

            <Link
              role="menuitem"
              href="/profile"
              onClick={closeMenu}
              className="flex h-[33px] items-center gap-2 rounded-lg px-3 text-sm leading-5 text-[#1d271f] transition hover:bg-[#e8f5eb] hover:text-[#05893e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893e]"
            >
              <User size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              role="menuitem"
              type="button"
              onClick={handleSignout}
              className="flex h-[33px] w-full items-center gap-2 rounded-lg px-3 text-left text-sm leading-5 text-[#d03739] transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d03739]"
            >
              <LogOut size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>সাইন আউট</span>
            </button>
          </div>
        )}
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
