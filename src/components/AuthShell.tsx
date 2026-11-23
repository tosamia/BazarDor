import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  page?: "signin" | "signup";
};

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-14">
      {children}
    </main>
  );
}
