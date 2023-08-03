import logoMesto from "../images/header-logo.svg";
import { Link, useLocation, Route, Routes } from "react-router-dom";

export default function Header({ userData, logOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoMesto}
        alt="Логотип Место Россия"
      />

      <div className="header__information">
        {location.pathname === "/signin" && (
          <Link to="/signup" className="header__menu">
            Регистрация
          </Link>
        )}
        {location.pathname === "/signup" && (
          <Link to="/signin" className="header__menu">
            Войти
          </Link>
        )}

        {location.pathname === "/" && (
          <>
            <p className="header__email">{userData}</p>
            <Link to="/signin" className="header__menu" onClick={logOut}>
              Выйти
            </Link>
          </>
        )}

        {/* <Routes>
          <Route
            path="/signin"
            element={
              <Link to="/signup" className="header__menu">
                Регистрация
              </Link>
            }
          ></Route>

          <Route
            path="/signup"
            element={
              <Link to="/signin" className="header__menu">
                Войти
              </Link>
            }
          ></Route>

          <Route
            path="/"
            element={
              <>
                <p className="header__email">{userData}</p>
                <Link to="/signin" className="header__menu" onClick={logOut}>
                  Выйти
                </Link>
              </>
            }
          ></Route>
        </Routes> */}
      </div>
    </header>
  );
}
