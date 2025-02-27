import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner, Modal } from "react-bootstrap";

const EditarMascota = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const id_usuario = localStorage.getItem("id_usuario"); // ID del usuario logueado
  const rol = localStorage.getItem("rol"); // Rol del usuario (esto debe estar en el localStorage)

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/mascotas/${id}`);
        const data = await response.json();

        if (response.ok) {
          setMascota(data);
        } else {
          setError("No se pudo cargar la información de la mascota.");
        }
      } catch (error) {
        console.error("Error al obtener la mascota:", error);
        setError("Hubo un error al obtener la mascota.");
      } finally {
        setLoading(false);
      }
    };

    fetchMascota();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/mascotas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mascota),
      });

      if (response.ok) {
        navigate("/mascotas");
      } else {
        setError("Hubo un error al editar la mascota.");
      }
    } catch (error) {
      console.error("Error al editar la mascota:", error);
      setError("Hubo un error al editar la mascota.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/mascotas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/mascotas");
      } else {
        setError("Hubo un error al eliminar la mascota.");
      }
    } catch (error) {
      console.error("Error al eliminar la mascota", error);
      setError("Hubo un error al eliminar la mascota.");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }


  return (
    <Container className="my-5">
      <h2 className="text-center">Editar Mascota</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {mascota && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la mascota"
              value={mascota.nombre}
              onChange={(e) => setMascota({ ...mascota, nombre: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="especie" className="mt-3">
            <Form.Label>Especie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la especie de la mascota"
              value={mascota.especie}
              onChange={(e) => setMascota({ ...mascota, especie: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="raza" className="mt-3">
            <Form.Label>Raza</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la raza de la mascota"
              value={mascota.raza}
              onChange={(e) => setMascota({ ...mascota, raza: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="edad" className="mt-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese la edad de la mascota"
              value={mascota.edad}
              onChange={(e) => setMascota({ ...mascota, edad: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="peso" className="mt-3">
            <Form.Label>Peso</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el peso de la mascota"
              value={mascota.peso}
              onChange={(e) => setMascota({ ...mascota, peso: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Guardar Cambios
          </Button>

          <Button variant="danger" onClick={handleShowModal} className="mt-4 ms-3">
            Eliminar Mascota
          </Button>
        </Form>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar esta mascota?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditarMascota;
