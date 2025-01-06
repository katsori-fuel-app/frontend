import Link from "next/link";

export default async function History() {
    return (
        <div>
            <Link href={`/profile`}>Профиль</Link>
        </div>
    )
};