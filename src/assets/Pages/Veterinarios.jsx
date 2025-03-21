import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Spinner, Card, Form } from "react-bootstrap";
import VeterinarioCard from "../Components/VeterinarioCard"; 

const Veterinarios = () => {
  const navigate = useNavigate();
  const [veterinarios, setVeterinarios] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [filteredVeterinarios, setFilteredVeterinarios] = useState([]);

  useEffect(() => {
    fetchVeterinarios();
  }, []);

  const fetchVeterinarios = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/usuarios/veterinarios`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setVeterinarios(data);
        setFilteredVeterinarios(data);
      } else {
        setError("No se pudieron cargar los veterinarios.");
      }
    } catch (error) {
      console.error("Error al obtener los veterinarios:", error);
      setError("Hubo un error al obtener los veterinarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchId(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredVeterinarios(veterinarios);
    } else {
      setFilteredVeterinarios(
        veterinarios.filter((veterinario) =>
          veterinario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          veterinario.apellido.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleAgendarCita = (veterinarioId) => {
    navigate(`/agendar-cita/${veterinarioId}`);
  };

  return (
    <Container className="d-flex flex-column align-items-center vh-100">
      <Card className="p-4 shadow-lg veterinarios-container w-75" style={{ border: "2px solid #001f3d", borderRadius: "8px", backgroundColor: "#e0e0e0" }}>
        <h3 className="text-center mb-4">Veterinarios Disponibles</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form className="mb-4">
          <Form.Group controlId="searchVeterinario">
            <Form.Control type="text" placeholder="Buscar por nombre o apellido" value={searchId} onChange={handleSearch} />
          </Form.Group>
        </Form>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4 justify-content-center d-flex align-items-center">
            {filteredVeterinarios.length > 0 ? (
              filteredVeterinarios.map((veterinario) => (
                <Col
                key={veterinario.id_usuario}
                xs={6}
                sm={6} 
                md={4} 
                lg={3} 
                xl={3} 
                className="d-flex justify-content-center mb-4"
                style={{ width: "auto" }} 
                >
                <VeterinarioCard
                    veterinario={veterinario}
                    onAgendar={() => handleAgendarCita(veterinario.id_usuario)}
                />
                </Col>

              ))
            ) : (
              <Col>
                <p className="text-center">No se encontraron veterinarios.</p>
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

export default Veterinarios;
