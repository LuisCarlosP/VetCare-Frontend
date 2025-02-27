import React, { useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VeterinarioHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (!rol || rol.toLowerCase() !== "veterinario") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("rol");
    navigate("/login");
  };

  const handleCitas = () => {
    navigate("/citas");
  };

  const handleMascotas = () => {
    navigate("/mascotas");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg text-center" style={{ width: "30rem" }}>
        <h2>Bienvenido al Panel del Veterinario</h2>
        <p>¡Has iniciado sesión como veterinario exitosamente!</p>

        <Row className="mt-4">
          <Col>
            <Button variant="info" className="w-100" onClick={handleCitas}>
              Gestionar Citas
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
            <Button variant="danger" className="w-100" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default VeterinarioHome;