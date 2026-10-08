export default function SectionHeading({
    title,
    copy,
}: {
    title: string;
    copy: string;
}) {
    return (
        <div>
            <h2 className="font-display text-5xl leading-none uppercase sm:text-6xl">
                {title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                {copy}
            </p>
        </div>
    );
}
