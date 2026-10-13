export default function DemoNotice() {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
            <p className="pointer-events-auto rounded-2xl border border-amber-300 bg-amber-100 px-4 py-1.5 text-center text-xs font-medium text-amber-900 shadow-sm">
                Demo site for demonstration purposes only. Admin login:{" "}
                <a href="/login" className="underline">
                    /login
                </a>{" "}
                · admin@mypersonalwork.com · admin1234
            </p>
        </div>
    );
}
