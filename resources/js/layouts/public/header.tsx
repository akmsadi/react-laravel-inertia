import { Link, usePage } from "@inertiajs/react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import type { MouseEvent } from "react";
import CartController from "@/actions/App/Http/Controllers/CartController";
import AuthenticatedCustomerSessionController from "@/actions/App/Http/Controllers/Customer/AuthenticatedCustomerSessionController";
import {
    login as customerLogin,
    register as customerRegister,
} from "@/routes/customer";

export default function Header() {
    const { auth, cartItemCount } = usePage().props;
    const { url } = usePage();
    const isHome = url.split(/[?#]/)[0] === "/";
    const [menuOpen, setMenuOpen] = useState(false);
    const itemCount = typeof cartItemCount === "number" ? cartItemCount : 0;

    const handleSectionClick = (event: MouseEvent<Element>, id: string) => {
        setMenuOpen(false);

        const section = document.getElementById(id);

        if (isHome && section) {
            event.preventDefault();
            section.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState(null, "", `/#${id}`);
        }
    };

    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur shadow">
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
                    <Link
                        href="/#teams"
                        onClick={(event) => handleSectionClick(event, "teams")}
                        className="px-3 py-2 text-center text-sm tracking-widest uppercase transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Teams
                    </Link>

                    <Link
                        href="/#members"
                        onClick={(event) =>
                            handleSectionClick(event, "members")
                        }
                        className="px-3 py-2 text-center text-sm tracking-widest uppercase transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Members
                    </Link>

                    <Link
                        href="/#gallery"
                        onClick={(event) =>
                            handleSectionClick(event, "gallery")
                        }
                        className="px-3 py-2 text-center text-sm tracking-widest uppercase transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Gallery
                    </Link>

                    <Link
                        href="/#join"
                        onClick={(event) => handleSectionClick(event, "join")}
                        className="px-3 py-2 text-center text-sm tracking-widest uppercase transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Join
                    </Link>

                    <Link
                        href="/products"
                        onClick={() => setMenuOpen(false)}
                        className="px-3 py-2 text-center text-sm tracking-widest uppercase transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        Products
                    </Link>

                    <Link
                        href={CartController.index.url()}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-center text-sm tracking-widest uppercase transition hover:bg-[#1f7a3d] hover:text-white"
                    >
                        <ShoppingCart size={16} aria-hidden="true" />
                        <span>Cart</span>
                        {itemCount > 0 && (
                            <span className="grid min-w-5 place-items-center rounded-full bg-[#1f7a3d] px-1.5 py-0.5 text-xs font-semibold text-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {auth.customer && (
                        <Link
                            href={
                                AuthenticatedCustomerSessionController.destroy()
                                    .url
                            }
                            method="post"
                            as="button"
                            onClick={() => setMenuOpen(false)}
                            className="px-3 py-2 text-center text-sm tracking-widest uppercase transition hover:bg-[#1f7a3d] hover:text-white"
                        >
                            Log out ({auth.customer.name})
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
