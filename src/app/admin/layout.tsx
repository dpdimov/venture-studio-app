"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Surveys", href: "/admin/surveys" },
  ];

  return (
    <div className="pt-[120px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <aside className="mb-8 w-full lg:mb-0 lg:w-64 lg:shrink-0">
            <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card">
              <div className="mb-6 border-b border-gray-200 pb-4">
                <p className="text-sm text-body-color">Signed in as</p>
                <p className="font-medium text-black">
                  {session?.user?.name || session?.user?.email}
                </p>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium transition ${
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          </aside>
          <main className="min-h-[60vh] flex-1 pb-20">{children}</main>
        </div>
      </div>
    </div>
  );
}
