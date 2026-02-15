"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white pt-12">
      <div className="container">
        <div className="flex flex-col items-center gap-4 border-t border-gray-200 py-8 sm:flex-row sm:justify-between">
          <Link href="/" className="inline-block">
            <Image src="/logo/logo.png" alt="logo" width={120} height={26} />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-body-color">
            <Link href="/privacy" className="transition hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-primary">Terms of Use</Link>
            <Link href="/admin" className="transition hover:text-primary">Admin</Link>
          </div>
        </div>
        <div className="pb-6">
          <p className="text-center text-sm text-body-color">
            &copy; {new Date().getFullYear()} Venture Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
