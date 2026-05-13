import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './form.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Réponse backend non JSON :", text);
        alert("Le backend plante encore.");
        return;
      }

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      } else {
        console.error(data);
        alert(data.message || data.error || "Erreur login");
      }
    } catch (error) {
      console.error("Erreur fetch :", error);
      alert("Impossible de joindre le backend.");
    } finally {
      setLoading(false);
    }
  }

  return (


    <div>

      <form className='form' onSubmit={handleSubmit}>
         <div className="left-part"></div>
          <div className='right-part'>
              <h1 className='titre'>CONNEXION</h1>

        <div className="inputbar">
          <h1 className='subtitle'>Adresse email :</h1>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputbar">
          <h1 className='subtitle'>Mot de passe :</h1>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='bigbtn' type="submit">
          {loading ? "Connexion ..." : "Connexion" }
        </button>
        </div>
      </form>
          </div>

  )
}