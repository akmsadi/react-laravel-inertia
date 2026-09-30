import { Link } from '@inertiajs/react';
import { ArrowUp } from 'lucide-react';
import CartController from '@/actions/App/Http/Controllers/CartController';
import { about, login } from '@/routes';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            <footer className="bg-[#14532d] text-white">
                <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-3">
                    <div>
                        <img
                            src="/assets/images/logo1.png"
                            alt="Evergreen Team"
                            className="h-auto w-40"
                        />
                        <p className="mt-4 max-w-sm text-sm text-white/70">
                            Evergreen Team is a community cricket club bringing
                            players and supporters together on and off the
                            field.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold tracking-widest uppercase">
                            Explore
                        </h2>
                        <ul className="mt-4 space-y-2 text-sm text-white/70">
                            <li>
                                <a
                                    href="/#teams"
                                    className="transition hover:text-white"
                                >
                                    Teams
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#members"
                                    className="transition hover:text-white"
                                >
                                    Members
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#gallery"
                                    className="transition hover:text-white"
                                >
                                    Gallery
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#join"
                                    className="transition hover:text-white"
                                >
                                    Join
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold tracking-widest uppercase">
                            Shop
                        </h2>
                        <ul className="mt-4 space-y-2 text-sm text-white/70">
                            <li>
                                <Link
                                    href="/products"
                                    className="transition hover:text-white"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={CartController.index.url()}
                                    className="transition hover:text-white"
                                >
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={about()}
                                    className="transition hover:text-white"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-white/60 sm:flex-row sm:px-8">
                        <p>
                            Copyright {year} Evergreen Team. All rights
                            reserved.
                        </p>
                        <Link
                            href={login()}
                            className="transition hover:text-white"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </footer>

            <a
                href="#home"
                aria-label="Back to top"
                className="fixed right-5 bottom-5 z-20 grid size-11 place-items-center bg-[#1f7a3d] text-white shadow-lg transition hover:bg-green-900"
            >
                <ArrowUp size={21} />
            </a>
        </>
    );
}
