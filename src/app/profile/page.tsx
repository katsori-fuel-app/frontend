"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUsers } from "shared/api/service";

export default async function Profile() {
    const [user, setUser] = useState()
    

  useEffect(() => {
    getUsers.then((res) => {
        console.log(res.data.at(-1));
      });

  }, []);
    return (
        <div>
            <Link href={`/history`}>История</Link>
            <h1>привет {}</h1>
        </div>
    )
};