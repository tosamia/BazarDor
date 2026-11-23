"use client";

const formatter = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function DynamicDate({
  className = "block text-[11px] text-gray-500",
}: {
  className?: string;
}) {
  return (
    <span suppressHydrationWarning className={className}>
      {formatter.format(new Date())}
    </span>
  );
}
