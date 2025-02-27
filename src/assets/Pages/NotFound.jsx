import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-4">Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Button variant="primary" onClick={() => navigate("/")}>Volver al inicio</Button>
    </Container>
  );
};

export default NotFound;
