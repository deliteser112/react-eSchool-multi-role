import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const auth = useSelector((state) => state.login);

  const { user, isLogged, isAdmin, isProfessor, isSecretar } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop__nav">
        <Link to="#">
          {user.name} <i className="fas fa-caret-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };


  return (
    <>
      <header>
        <Link to="/" className="round__logo" />
        <div className="nav">
          {isLogged ? (
            userLink()
          ) : (
            <div className="login__btn">
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i>Login
              </Link>
            </div>
          )}
        </div>
      </header>
      <div className="nav__menu">
        <div className="menu__items">
          <ul className="menu left">
            <li>
              <Link to="/">Anunturi</Link>
            </li>
            <li>
              <Link to="/personal">Personal</Link>
            </li>
            <li>
              <Link to="/secretariat">Secretariat</Link>
            </li>
          </ul>
          <ul className="menu right">
            <li>
              <Link to="/orar">Orar</Link>
            </li>
            <li>
              <Link to="/oreonline">Ore Online</Link>
            </li>
            {isLogged ? (
              <li>
                <Link to="/profile">
                  {isAdmin && "Dashboard" || isProfessor && "Clase" || isSecretar && "Informatii" || "Note"}
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
