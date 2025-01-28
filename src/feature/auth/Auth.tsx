"use client";

import { ChangeEvent, useEffect, useState } from "react";
import "./auth.scss";
import { useRouter } from "next/navigation";
import { userService } from "shared/api/services";

export const Auth = () => {
  const isReg = true;
  const router = useRouter()

  const [userCreds, setUserCreds] = useState({
    email: '',
    login: '',
    password: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>, type: any) =>  {
    if (type === 'email')  {
        return setUserCreds(prev => ({
            ...prev,
            email: e.target.value
        }))
    }

    if (type === 'login')  {
        return setUserCreds(prev => ({
            ...prev,
            login: e.target.value
        }))
    }


    if (type === 'password')  {
        return setUserCreds(prev => ({
            ...prev,
            password: e.target.value
        }))
    }
  }

  const onClick = () => {
    userService.createUser(userCreds).then(() => {
      router.push("/profile");
    });
  };

  return (
    <div className="auth">
      {isReg ? (
        <div className="auth__block">
            <p className="auth__block__title">Регистрация</p>

            <div className="auth__block__input-wrapper">
                <input className="input" placeholder="Укажите ваш email" onChange={(e) => onChange(e, 'email')} />
            </div>

            <div className="auth__block__input-wrapper">
             <input className="input" placeholder="Придумайте логин" onChange={(e) => onChange(e, 'login')} />
            </div>

            <div className="auth__block__input-wrapper">
                <input className="input" placeholder="Придумайте пароль" onChange={(e) => onChange(e, 'password')} />
            </div>

            <div className="auth__block__input-wrapper">
                <input className="input" placeholder="Подтвердите пароль" />
            </div>

            <button className="button" onClick={onClick}>Зарегистрироваться</button>
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
