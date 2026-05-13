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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://logregdel.onrender.com/api/register", {
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
      });

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
  if (nom && prenom) {
    setStep1(false);
  } else {
    setStep1(true);
  }
}

function goBack() {
  setStep1(true);
}

  return (
    
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="left-part"></div>
{/* step1 */}
            <div className="right-part">
      <h1 className="titre">INCSCRIPTION</h1>

              {step1 ? (
                    <div className="step1">
            <div className="inputbar">
              <h1 className="subtitle">Nom :</h1>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="inputbar">
              <h1 className="subtitle">Prénom :</h1>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div className="step1infos">
              <h2>Étape 1/2</h2>
              <button type="button" className="littlebtn" onClick={validateStep1}>SUIVANT</button>
            </div>
      </div>
              ): (
                              <div className="step2">
                <div className="inputbar">
                  <h1 className="subtitle">Adresse email :</h1>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inputbar">
                  <h1 className="subtitle">Mot de passe :</h1>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="inputbar">
                  <h1 className="subtitle">Réécrire le mot de passe :</h1>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                            <div className="step1infos">
              <h2>Étape 2/2</h2>
                        <button className="littlebtn" type="submit" disabled={loading}>
          {loading ? "INSCRIPTION..." : "Inscription"}
        </button>            
        </div>
        <a className="back" onClick={goBack}>Revenir en arrière</a>




        {error && <p className="error">{error}</p>}


              </div>
              )}
        </div>
      </form>
    </div>
  );
}