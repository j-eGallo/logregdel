import "./form.css";
import { useState } from "react";

// Propriété permettant de signaler une inscription réussie
type RegisterProps = {
  onRegisterSuccess: () => void;
};

export default function Register({ onRegisterSuccess }: RegisterProps) {

  // Informations de l'utilisateur
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Gestion des étapes du formulaire
  const [step1, setStep1] = useState(true);

  // Gestion du chargement et des erreurs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Vérification de la complexité du mot de passe
  function validatePassword(password: string): boolean {

    // Minimum 8 caractères
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }

    // Présence d'une majuscule
    if (!/[A-Z]/.test(password)) {
      setError("Le mot de passe doit contenir une majuscule.");
      return false;
    }

    // Présence d'une minuscule
    if (!/[a-z]/.test(password)) {
      setError("Le mot de passe doit contenir une minuscule.");
      return false;
    }

    // Présence d'un chiffre
    if (!/[0-9]/.test(password)) {
      setError("Le mot de passe doit contenir un chiffre.");
      return false;
    }

    // Présence d'un caractère spécial autorisé
    if (!/[@!()"#$%&*?]/.test(password)) {
      setError("Le mot de passe doit contenir un caractère spécial.");
      return false;
    }

    return true;
  }

  // Envoi du formulaire d'inscription
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    // Empêche le rechargement de la page
    e.preventDefault();
    setError("");

    // Vérification de la première étape
    if (step1) {
      validateStep1();
      return;
    }

    // Vérification du mot de passe
    if (!validatePassword(password)) {
      return;
    }

    // Vérification de la confirmation du mot de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {

      // Activation du chargement
      setLoading(true);

      // Envoi des informations à l'API Symfony
      const response = await fetch(
        "https://logregdel.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            prenom,
            nom,
          }),
        }
      );

      // Récupération de la réponse du serveur
      const data = await response.json();

      // Gestion d'une inscription refusée
      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription.");
        return;
      }

      // Informe le composant parent que l'inscription a réussi
      onRegisterSuccess();

    } catch (err) {

      // Gestion des erreurs de communication avec le serveur
      console.error(err);
      setError("Impossible de contacter le serveur.");

    } finally {

      // Désactivation du chargement
      setLoading(false);
    }
  }

  // Vérification du nom et du prénom avant l'étape 2
  function validateStep1() {
    setError("");

    if (nom.trim() && prenom.trim()) {
      setStep1(false);
    } else {
      setError("Veuillez renseigner votre nom et votre prénom.");
    }
  }

  // Retour à la première étape
  function goBack() {
    setError("");
    setStep1(true);
  }

  // Affichage du formulaire
  return (
    <div>

      <form className="form" onSubmit={handleSubmit}>

        {/* Image située à gauche du formulaire */}
        <div className="left-part"></div>

        {/* Partie principale du formulaire */}
        <div className="right-part">

          <h1 className="titre">INSCRIPTION</h1>

          {step1 ? (

            /* ÉTAPE 1 : INFORMATIONS PERSONNELLES */

            <div className="step1">

              {/* Champ du nom */}
              <div className="inputbar">

                <h1 className="subtitle">Nom :</h1>

                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />

              </div>

              {/* Champ du prénom */}
              <div className="inputbar">

                <h1 className="subtitle">Prénom :</h1>

                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />

              </div>

              {/* Passage à la deuxième étape */}
              <div className="step1infos">

                <h2>Étape 1/2</h2>

                <button
                  type="button"
                  className="littlebtn"
                  onClick={validateStep1}
                >
                  SUIVANT
                </button>

              </div>

            </div>

          ) : (

            /* ÉTAPE 2 : INFORMATIONS DE CONNEXION */

            <div className="step2">

              {/* Champ de l'adresse email */}
              <div className="inputbar">

                <h1 className="subtitle">Adresse email :</h1>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

              {/* Champ du mot de passe */}
              <div className="inputbar">

                <h1 className="subtitle">Mot de passe :</h1>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                />

                {/* Rappel des critères du mot de passe */}
                <p className="password-info">
                  8 caractères minimum, une majuscule,
                  une minuscule, un chiffre et un caractère spécial.
                </p>

              </div>

              {/* Confirmation du mot de passe */}
              <div className="inputbar">

                <h1 className="subtitle">
                  Réécrire le mot de passe :
                </h1>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  required
                />

              </div>

              {/* Bouton de validation de l'inscription */}
              <div className="step1infos">

                <h2>Étape 2/2</h2>

                <button
                  className="littlebtn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "INSCRIPTION..." : "Inscription"}
                </button>

              </div>

              {/* Retour à l'étape précédente */}
              <a className="back" onClick={goBack}>
                Revenir en arrière
              </a>

            </div>
          )}

          {/* Affichage du message d'erreur */}
          {error && (
            <div className="register-error" role="alert">
              {error}
            </div>
          )}

        </div>

      </form>

    </div>
  );
}