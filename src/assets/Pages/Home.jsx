import React, { useEffect, useState } from "react";
import { Container, Button, Card, Nav, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
    localStorage.removeItem("id_usuario");
    navigate("/login");
  };

  const handleEditProfile = () => {
    const id_usuario = localStorage.getItem("id_usuario");
    navigate(`/editar-usuario/${id_usuario}`);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg text-center" style={{ width: "30rem" }}>
        <h2 className="mb-4">Bienvenido a VetCare</h2>
        <p>¡Has iniciado sesión exitosamente!</p>

        <Nav className="flex-column mb-4">
          <Button variant="info" className="mb-2" onClick={() => navigate("/agregar-cita")}>
            📅 Agendar Cita
          </Button>
          <Button variant="primary" className="mb-2" onClick={() => navigate("/mascotas")}>
            🐶 Mis Mascotas
          </Button>
          <Button variant="success" className="mb-2" onClick={() => navigate("/veterinarios")}>
            🏥 Veterinarios
          </Button>
          <Button variant="info" className="mb-2" onClick={handleEditProfile}>
          ✏️ Editar Perfil
          </Button>
        </Nav>
        

        <Button variant="danger" onClick={() => setShowModal(true)} className="w-100">
          Cerrar Sesión
        </Button>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
