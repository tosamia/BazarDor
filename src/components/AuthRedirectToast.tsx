"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function AuthRedirectToast() {
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;

    const callbackURL = new URLSearchParams(window.location.search).get(
      "callbackURL"
    );

    if (callbackURL) {
      shown.current = true;
      toast("এই পেজটি দেখতে আগে সাইন ইন করুন।", {
        icon: "🔒",
        duration: 4000,
      });
    }
  }, []);

  return null;
}
