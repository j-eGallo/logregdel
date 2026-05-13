import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./home.css";

type User = {
  prenom: string;
  nom: string;
};

export default function Home() {

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, [storedUser, navigate]);

  if (!storedUser) {
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function handleDelete() {

    try {

      const response = await fetch("http://localhost:8000/api/deleteAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erreur suppression");
        return;
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Impossible de contacter le serveur.");
    }
  }

  function openButton() {
    setIsOpen(true);
  }

  const user = JSON.parse(storedUser) as User;

  return (
    <div className="home">

      <h1 className="wmsg">
        Bienvenue {user.prenom} {user.nom}
      </h1>

      <div className="panelbtn">

        <button className="homebtn" onClick={handleLogout}>
          DECONNEXION
        </button>

        <button className="homebtn" onClick={openButton}>
          SUPPRIMER MON COMPTE
        </button>

      </div>

      {isOpen && (
        <div className="modal">

          <div className="modal-content">

            <h2>Supprimer mon compte</h2>

            <input
              type="email"
              placeholder="Adresse Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="input-modal">

              <button onClick={() => setIsOpen(false)}>
                Annuler
              </button>

              <button onClick={handleDelete}>
                Confirmer
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}