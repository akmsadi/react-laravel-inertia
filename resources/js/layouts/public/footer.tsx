import { ArrowUp } from "lucide-react";

export default function Footer() {
    return (
        <>
            <footer className="py-7 text-center text-sm text-white bg-[#1f7a3d]">
                Copyright 2026 Evergreen Team. All rights reserved.
            </footer>

            <a
                href="#home"
                aria-label="Back to top"
                className="fixed bottom-5 right-5 z-20 grid size-11 place-items-center bg-[#1f7a3d] text-white shadow-lg transition hover:bg-green-900"
            >
                <ArrowUp size={21} />
            </a>
        </>
    );
}
