import Register from "./Register";
import Login from "./Login";
import "./formulaire.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Formulaire() {

  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (storedUser) {
      navigate("/home");
    }
  }, [storedUser, navigate]);

  return (
    <div className="form-container">

      {isLogin ? (
        <Login />
      ) : (
        <Register onRegisterSuccess={() => setIsLogin(true)} />
      )}

      <h1 className="msg">
        {isLogin ? (
          <>
            Si vous souhaitez vous inscrire{" "}
            <a onClick={() => setIsLogin(false)}>
              cliquez ici
            </a>
          </>
        ) : (
          <>
            Si vous avez déjà un compte{" "}
            <a onClick={() => setIsLogin(true)}>
              cliquez ici
            </a>
          </>
        )}
      </h1>

    </div>
  );
}