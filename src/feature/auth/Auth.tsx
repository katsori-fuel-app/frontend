"use client";

import { useEffect } from "react";
import "./auth.scss";

export const Auth = () => {
  const isReg = true;

  useEffect(() => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify({
        firstname: "qwe",
        age: 1,
      }),
    }).then(() => {
      fetch("http://localhost:4000/users", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => console.log(data));
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
