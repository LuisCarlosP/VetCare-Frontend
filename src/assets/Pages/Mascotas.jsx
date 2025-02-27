import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Spinner, Card } from "react-bootstrap";
import MascotaCard from "../Components/MascotaCard";

const Mascotas = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const id_usuario = localStorage.getItem("id_usuario");

  useEffect(() => {
    if (!id_usuario) {
      navigate("/login");
    } else {
      fetchMascotas(id_usuario);
    }
  }, [id_usuario, navigate]);

  const fetchMascotas = async (idUsuario) => {
    try {
      const url = `http://localhost:8080/api/mascotas/usuario/${idUsuario}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setMascotas(data);
      } else {
        setError("No se pudieron cargar las mascotas.");
      }
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
      setError("Hubo un error al obtener las mascotas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (idMascota) => {
    try {
      const url = `http://localhost:8080/api/mascotas/${idMascota}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        setMascotas(mascotas.filter((mascota) => mascota.idMascota !== idMascota));
      } else {
        setError("No se pudo eliminar la mascota.");
      }
    } catch (error) {
      console.error("Error al eliminar la mascota:", error);
      setError("Hubo un error al eliminar la mascota.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 shadow-lg mascotas-container"
        style={{
          border: "2px solid #001f3d",
          borderRadius: "8px",
          backgroundColor: "#e0e0e0",
        }}
      >
        <h3 className="text-center mb-4">Mis Mascotas</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4 justify-content-center">
            {mascotas.length > 0 ? (
              mascotas.map((mascota) => (
                <Col key={mascota.idMascota} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
                  <MascotaCard mascota={mascota} onDelete={handleDelete} />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-center">No se encontraron mascotas.</p>
              </Col>
            )}
          </Row>
        )}

        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Button variant="primary" onClick={() => navigate("/register-mascota")} size="lg">
              Agregar Mascota
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={() => navigate("/home")} size="lg">
              Volver a Home
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Mascotas;
