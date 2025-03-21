import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Spinner, Card, Form } from "react-bootstrap";
import MascotaCard from "../Components/MascotaCard";

const MascotasVeterinario = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [filteredMascotas, setFilteredMascotas] = useState([]);
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    if (rol?.toLowerCase() !== "veterinario") {
        navigate("/home");
    } else {
      fetchMascotas();
    }
  }, [rol, navigate]);

  const fetchMascotas = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL; 
      const url = `${apiUrl}/api/mascotas`;  
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        setMascotas(data);
        setFilteredMascotas(data);
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
  

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchId(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredMascotas(mascotas);
    } else {
      setFilteredMascotas(
        mascotas.filter((mascota) => mascota.idMascota.toString().includes(searchTerm))
      );
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center vh-100">
      <Card className="p-4 shadow-lg mascotas-container w-75" style={{ border: "2px solid #001f3d", borderRadius: "8px", backgroundColor: "#e0e0e0" }}>
        <h3 className="text-center mb-4">Todas las Mascotas</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form className="mb-4">
          <Form.Group controlId="searchMascota">
            <Form.Control type="text" placeholder="Buscar por ID de mascota" value={searchId} onChange={handleSearch} />
          </Form.Group>
        </Form>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4 justify-content-center">
            {filteredMascotas.length > 0 ? (
              filteredMascotas.map((mascota) => (
                <Col key={mascota.idMascota} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
                  <MascotaCard mascota={mascota} mostrarId={true} />
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
            <Button variant="primary" onClick={() => navigate("/home")} size="lg">
              Volver a Home
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MascotasVeterinario;
