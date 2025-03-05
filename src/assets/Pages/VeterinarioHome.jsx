import React, { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VeterinarioHome = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (!rol || rol.toLowerCase() !== "veterinario") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("rol");
    localStorage.removeItem("id_usuario");
    navigate("/login");
  };

  const handleUsuario = () => {
    const id_usuario = localStorage.getItem("id_usuario");
    navigate(`/editar-usuario/${id_usuario}`); 
  };

  const handleMascotas = () => {
    navigate("/mascotas-veterinario");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg text-center" style={{ width: "30rem" }}>
        <h2>Bienvenido al Panel del Veterinario</h2>
        <p>¡Has iniciado sesión como veterinario exitosamente!</p>

        <Row className="mt-4">
          <Col>
            <Button variant="info" className="w-100" onClick={handleUsuario}>
              Editar Perfil
            </Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Button variant="info" className="w-100" onClick={handleMascotas}>
              Gestionar Mascotas
            </Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button variant="danger" className="w-100" onClick={() => setShowModal(true)}>
              Cerrar Sesión
            </Button>
          </Col>
        </Row>
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

export default VeterinarioHome;
