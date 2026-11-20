import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './form.css'

export default function Login() {

  // Informations de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gestion de la navigation
  const navigate = useNavigate();

  // Gestion du chargement
  const [loading, setLoading] = useState(false);

  // Envoi du formulaire de connexion
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    // Empêche le rechargement de la page
    e.preventDefault();

    // Activation du chargement
    setLoading(true);

    try {

      // Envoi des identifiants à l'API Symfony
      const response = await fetch(
        "https://logregdel.onrender.com/api/login",
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
      const text = await response.text();

      let data;

      // Conversion de la réponse au format JSON
      try {
        data = JSON.parse(text);

      } catch {

        // Gestion d'une réponse invalide du serveur
        console.error("Réponse backend non JSON :", text);
        alert("Le backend plante encore.");
        return;
      }

      // Vérification du succès de la connexion
      if (response.ok) {

        // Stockage du token JWT
        localStorage.setItem("token", data.token);

        // Stockage des informations de l'utilisateur
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirection vers la page d'accueil
        navigate("/home");

      } else {

        // Affichage d'une erreur de connexion
        console.error(data);
        alert(data.message || data.error || "Erreur login");
      }

    } catch (error) {

      // Gestion des erreurs de communication avec le serveur
      console.error("Erreur fetch :", error);
      alert("Impossible de joindre le backend.");

    } finally {

      // Désactivation du chargement
      setLoading(false);
    }
  }

  // Affichage du formulaire de connexion
  return (

    <div>

      <form className='form' onSubmit={handleSubmit}>

        {/* Image située à gauche du formulaire */}
        <div className="left-part"></div>

        {/* Partie principale du formulaire */}
        <div className='right-part'>

          <h1 className='titre'>CONNEXION</h1>

          {/* Champ de l'adresse email */}
          <div className="inputbar">

            <h1 className='subtitle'>Adresse email :</h1>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* Champ du mot de passe */}
          <div className="inputbar">

            <h1 className='subtitle'>Mot de passe :</h1>

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          {/* Bouton de connexion */}
          <button className='bigbtn' type="submit">
            {loading ? "Connexion ..." : "Connexion"}
          </button>

        </div>

      </form>

    </div>

  )
}