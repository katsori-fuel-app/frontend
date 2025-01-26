"use client";

import { useEffect, useState } from "react";
import { UserDto } from "shared/api/dto";
import { userService } from "shared/api/services";

export default function Profile() {
  const [user, setUser] = useState<UserDto>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getAllUser()
      .then((res) => {
        setUser(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>no user...</h1>;

  return (
    <div>
      <h1>привет, {user.email}</h1>
    </div>
  );
}
