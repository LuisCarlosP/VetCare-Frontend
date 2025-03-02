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

function App() {
  return (
    <Router>
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
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
