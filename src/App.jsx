import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./assets/Pages/Login";
import Register from "./assets/Pages/Register";
import Home from "./assets/Pages/Home";
import VeterinarioHome from "./assets/Pages/VeterinarioHome";
import NotFound from "./assets/Pages/NotFound";
import RegisterMascota from "./assets/Pages/RegisterMascota";
import Mascotas from "./assets/Pages/Mascotas";
import EditarMascota from "./assets/Pages/EditarMascota";
import MascotasVeterinario from "./assets/Pages/MascotasVeterinario"; 
import EditarUsuario from "./assets/Pages/EditarUsuario";
import Veterinarios from "./assets/Pages/Veterinarios";

function App() {
  return (
    <Router basename="/VetCare-Frontend">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/VeterinarioHome" element={<VeterinarioHome />} />
        <Route path="/register-mascota" element={<RegisterMascota />} />
        <Route path="/mascotas" element={<Mascotas />} />
        <Route path="/editar-mascota/:id" element={<EditarMascota />} />
        <Route path="/mascotas-veterinario" element={<MascotasVeterinario />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/veterinarios" element={<Veterinarios />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
