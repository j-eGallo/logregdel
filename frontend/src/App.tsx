import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import TopBar from './components/TopBar'
import Formulaire from './components/Formulaire'
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {

  return (

    <BrowserRouter>
      <section id="center">
        <div className="hero">
        <TopBar />
        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />


          <Route
              path="/login"
              element={
                  <Formulaire />
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </BrowserRouter>
  )
}

export default App
