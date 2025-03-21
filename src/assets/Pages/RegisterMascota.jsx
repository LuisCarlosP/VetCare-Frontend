import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const RegisterMascota = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [tipo, setTipo] = useState("");
  const [especie, setEspecie] = useState(""); 
  const [descripcion, setDescripcion] = useState("");
  const [peso, setPeso] = useState("");
  const [error, setError] = useState("");
  const id_usuario = localStorage.getItem("id_usuario");

  useEffect(() => {
    if (!id_usuario) {
      navigate("/login"); 
    }
  }, [id_usuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !raza || !edad || !tipo || !especie || !peso) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const mascotaData = {
      nombre,
      raza,
      edad,
      tipo,
      especie,
      descripcion,
      peso,
      idUsuario: id_usuario,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/mascotas/register-mascota`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mascotaData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Mascota registrada con éxito",
          text: "Tu mascota ha sido registrada.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/mascotas");
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Hubo un error al registrar la mascota",
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar la mascota. Intenta nuevamente.",
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "30rem" }} className="p-4 shadow-lg">
        <h3 className="text-center">Registrar Mascota</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre de tu mascota"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRaza">
            <Form.Label>Raza</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la raza de tu mascota"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa la edad de tu mascota"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el tipo de mascota (ej. Perro, Gato)"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEspecie">
            <Form.Label>Especie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la especie de la mascota (ej. Canino, Felino)"
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPeso">
            <Form.Label>Peso (kg)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa el peso de tu mascota"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Registrar Mascota
          </Button>
        </Form>

        <Row className="mt-3">
          <Col className="text-center">
            <Link to="/mascotas">
              <Button variant="link" className="text-decoration-none">
                Volver a las Mascotas
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default RegisterMascota;
