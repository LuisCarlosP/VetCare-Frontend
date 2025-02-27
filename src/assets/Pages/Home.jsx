import React, { useEffect } from "react";
import { Container, Button, Card, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");

    if (!rol) {
      navigate("/login");
    } else if (rol.toLowerCase() === "veterinario") {
      navigate("/VeterinarioHome");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("rol");
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg text-center" style={{ width: "30rem" }}>
        <h2 className="mb-4">Bienvenido a VetCare</h2>
        <p>¡Has iniciado sesión exitosamente!</p>

        <Nav className="flex-column mb-4">
          <Button 
            variant="info" 
            className="mb-2" 
            onClick={() => navigate("/agregar-cita")}
          >
            📅 Agendar Cita
          </Button>
          <Button 
            variant="primary" 
            className="mb-2" 
            onClick={() => navigate("/mascotas")}
          >
            🐶 Mis Mascotas
          </Button>
          <Button 
            variant="success" 
            className="mb-2" 
            onClick={() => navigate("/veterinarios")}
          >
            🏥 Veterinarios
          </Button>
        </Nav>

        <Button 
          variant="danger" 
          onClick={handleLogout} 
          className="w-100"
        >
          Cerrar Sesión
        </Button>
      </Card>
    </Container>
  );
};

export default Home;