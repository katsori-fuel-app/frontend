"use client";

import { useEffect } from "react";
import "./auth.scss";
import { getUsers } from "shared/api/service";

export const Auth = () => {
  const isReg = true;

  useEffect(() => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: "log1",
        password: "pas1",
        email: "em1",
      }),
    }).then(() => {
      getUsers.then((res) => {
        console.log(res);
      });
    });
  }, []);

  return (
    <div className="auth">
      {isReg ? (
        <div className="auth__block">
          <p className="auth__block__title">Регистрация</p>

          <div className="auth__block__input-wrapper">
            <input className="input" placeholder="Укажите ваше имя" />
          </div>

          <div className="auth__block__input-wrapper">
            <input className="input" placeholder="Придумайте пароль" />
          </div>

          <div className="auth__block__input-wrapper">
            <input className="input" placeholder="Подтвердите пароль" />
          </div>

          <button className="button">Зарегистрироваться</button>
        </div>
      ) : (
        <div className="auth__block">
          <div>Авторизация</div>

          <input placeholder="Введите имя" />
          <input placeholder="Введите пароль" />
        </div>
      )}
    </div>
  );
};
