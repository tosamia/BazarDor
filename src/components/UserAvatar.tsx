"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";

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

export default function UserAvatar({
  image,
  name,
  size = "sm",
}: {
  image?: string | null;
  name: string;
  size?: "sm" | "lg";
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = getSafeImageUrl(image);
  const showImage = src !== null && failedSrc !== src;
  const isLarge = size === "lg";

  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-[#e8f3ea] ring-1 ring-inset ring-[#d7e6d9] ${
        isLarge
          ? "h-16 w-16 rounded-full sm:h-[70px] sm:w-[70px]"
          : "h-9 w-9 rounded-[10.5px]"
      }`}
    >
      {showImage ? (
        <Image
          src={src}
          alt={`${name}-এর প্রোফাইল ছবি`}
          fill
          unoptimized
          sizes={isLarge ? "70px" : "36px"}
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span
          role="img"
          aria-label={`${name}-এর প্রোফাইল ছবি`}
          className="flex h-full w-full items-center justify-center text-[#05893e]"
        >
          <User
            size={isLarge ? 30 : 18}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );
}
