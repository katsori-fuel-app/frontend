import Link from "next/link";

export default async function Profile() {
    return (
        <div>
            <Link href={`/history`}>История</Link>
        </div>
    )
};