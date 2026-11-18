import "./form.css";
import { useState } from "react";

type RegisterProps = {
  onRegisterSuccess: () => void;
};

export default function Register({ onRegisterSuccess }: RegisterProps) {

  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step1, setStep1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validatePassword(password: string): boolean {

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Le mot de passe doit contenir une majuscule.");
      return false;
    }

    if (!/[a-z]/.test(password)) {
      setError("Le mot de passe doit contenir une minuscule.");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError("Le mot de passe doit contenir un chiffre.");
      return false;
    }

    if (!/[@!()"#$%&*?]/.test(password)) {
      setError("Le mot de passe doit contenir un caractère spécial.");
      return false;
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (step1) {
      validateStep1();
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

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

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription.");
        return;
      }

      onRegisterSuccess();

    } catch (err) {
      console.error(err);
      setError("Impossible de contacter le serveur.");

    } finally {
      setLoading(false);
    }
  }

  function validateStep1() {
    setError("");

    if (nom.trim() && prenom.trim()) {
      setStep1(false);
    } else {
      setError("Veuillez renseigner votre nom et votre prénom.");
    }
  }

  function goBack() {
    setError("");
    setStep1(true);
  }

  return (
    <div>

      <form className="form" onSubmit={handleSubmit}>

        <div className="left-part"></div>

        <div className="right-part">

          <h1 className="titre">INSCRIPTION</h1>

          {step1 ? (

            <div className="step1">

              <div className="inputbar">

                <h1 className="subtitle">Nom :</h1>

                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />

              </div>

              <div className="inputbar">

                <h1 className="subtitle">Prénom :</h1>

                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />

              </div>

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

            <div className="step2">

              <div className="inputbar">

                <h1 className="subtitle">Adresse email :</h1>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

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

                <p className="password-info">
                  8 caractères minimum, une majuscule,
                  une minuscule, un chiffre et un caractère spécial.
                </p>

              </div>

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

              <a className="back" onClick={goBack}>
                Revenir en arrière
              </a>

            </div>
          )}

          {/* MESSAGE D'ERREUR */}

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