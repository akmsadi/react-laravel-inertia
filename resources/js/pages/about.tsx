import { Head, Link, usePage } from "@inertiajs/react";
import { dashboard, login } from "@/routes";
import { register } from "@/routes";

export default function About() {
    const { auth } = usePage().props;

    return (
        <>
            <h1>About page</h1>
            <div className="hidden h-14.5 lg:block"></div>
        </>
    );
}
