import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./home.css";

// Structure des informations de l'utilisateur
type User = {
  prenom: string;
  nom: string;
};

export default function Home() {

  // Gestion de la navigation
  const navigate = useNavigate();

  // Récupération de l'utilisateur dans le stockage local
  const storedUser = localStorage.getItem("user");

  // Gestion de l'ouverture de la fenêtre de suppression
  const [isOpen, setIsOpen] = useState(false);

  // Informations nécessaires à la suppression du compte
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Redirection si aucun utilisateur n'est stocké
  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, [storedUser, navigate]);

  // Empêche l'affichage en l'absence d'utilisateur
  if (!storedUser) {
    return null;
  }

  // Déconnexion de l'utilisateur
  function handleLogout() {

    // Suppression des informations et du token JWT
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirection vers la page de connexion
    navigate("/login");
  }

  // Suppression du compte utilisateur
  async function handleDelete() {

    try {

      // Envoi des identifiants à l'API de suppression
      const response = await fetch(
        "https://logregdel.onrender.com/api/deleteAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password,
          })
        }
      );

      // Récupération de la réponse du serveur
      const data = await response.json();

      // Vérification du succès de la suppression
      if (!response.ok) {
        alert(data.error || "Erreur suppression");
        return;
      }

      // Suppression des données stockées localement
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirection vers la page de connexion
      navigate("/login");

    } catch (error) {

      // Gestion des erreurs de communication avec le serveur
      console.error(error);
      alert("Impossible de contacter le serveur.");
    }
  }

  // Ouverture de la fenêtre de confirmation
  function openButton() {
    setIsOpen(true);
  }

  // Conversion des informations de l'utilisateur en objet
  const user = JSON.parse(storedUser) as User;

  // Affichage de la page d'accueil
  return (

    <div className="home">

      {/* Message de bienvenue personnalisé */}
      <h1 className="wmsg">
        Bienvenue {user.prenom} {user.nom}
      </h1>

      {/* Boutons de gestion du compte */}
      <div className="panelbtn">

        {/* Bouton de déconnexion */}
        <button className="homebtn" onClick={handleLogout}>
          DECONNEXION
        </button>

        {/* Bouton de suppression du compte */}
        <button className="homebtn" onClick={openButton}>
          SUPPRIMER MON COMPTE
        </button>

      </div>

      {/* Fenêtre de confirmation de suppression */}
      {isOpen && (

        <div className="modal">

          <div className="modal-content">

            <h2>Supprimer mon compte</h2>

            {/* Adresse email de l'utilisateur */}
            <input
              type="email"
              placeholder="Adresse Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Mot de passe de l'utilisateur */}
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Boutons de confirmation ou d'annulation */}
            <div className="input-modal">

              {/* Fermeture de la fenêtre */}
              <button onClick={() => setIsOpen(false)}>
                Annuler
              </button>

              {/* Confirmation de la suppression */}
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