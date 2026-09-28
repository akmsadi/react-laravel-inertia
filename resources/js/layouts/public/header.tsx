import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { login } from "@/routes";

export default function Header() {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
            <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3 sm:px-8">
                <Link
                    href="/"
                    className="shrink-0"
                    onClick={() => setMenuOpen(false)}
                >
                    <img
                        src="/assets/images/logo1.png"
                        alt="Evergreen Team"
                        className="h-auto w-36 sm:w-44"
                    />
                </Link>

                <button
                    type="button"
                    className="grid size-10 place-items-center lg:hidden"
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? <X size={25} /> : <Menu size={25} />}
                </button>

                <div
                    className={`${
                        menuOpen ? "flex" : "hidden"
                    } absolute inset-x-0 top-full flex-col border-b border-zinc-200 bg-white px-5 py-4 lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0`}
                >
                    <a
                        href="/#teams"
                        onClick={() => setMenuOpen(false)}
                        className="px-3 py-2 text-center text-sm uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Teams
                    </a>

                    <a
                        href="/#members"
                        onClick={() => setMenuOpen(false)}
                        className="px-3 py-2 text-center text-sm uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Members
                    </a>

                    <a
                        href="/#gallery"
                        onClick={() => setMenuOpen(false)}
                        className="px-3 py-2 text-center text-sm uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Gallery
                    </a>

                    <a
                        href="/#join"
                        onClick={() => setMenuOpen(false)}
                        className="px-3 py-2 text-center text-sm uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Join
                    </a>

                    <a
                        href="/#products"
                        onClick={() => setMenuOpen(false)}
                        className="px-3 py-2 text-center text-sm uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Products
                    </a>

                    {auth.user ? (
                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="px-3 py-2 text-center text-sm uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={login()}
                            onClick={() => setMenuOpen(false)}
                            className="px-3 py-2 text-center text-sm uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                        >
                            Admin
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
