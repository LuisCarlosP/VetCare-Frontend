import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner, Modal } from "react-bootstrap";

const EditarMascota = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const id_usuario = localStorage.getItem("id_usuario");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL; 
        const response = await fetch(`${apiUrl}/api/mascotas/${id}`);
        const data = await response.json();

        if (response.ok) {
          if (rol?.toLowerCase() !== "veterinario" && data.idUsuario !== Number(id_usuario)) {
            setError("No tienes permiso para editar esta mascota.");
            setLoading(false);
            return;
          }
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
  }, [id, id_usuario, rol]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    try {
      const apiUrl = import.meta.env.VITE_API_URL; 
      const response = await fetch(`${apiUrl}/api/mascotas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "id_usuario": id_usuario,
          "rol": rol,
        },
        body: JSON.stringify(mascota),
      });

      if (response.ok) {
        if (rol && rol.toLowerCase() === "veterinario") {
          navigate("/mascotas-veterinario");
        } else {
          navigate("/mascotas");
        }
      } else {
        console.error("Error en la respuesta del servidor:", await response.text());
        setError("Hubo un error al editar la mascota.");
      }
    } catch (error) {
      console.error("Error al editar la mascota:", error);
      setError("Hubo un error al editar la mascota.");
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL; 
      const response = await fetch(`${apiUrl}/api/mascotas/${id}`, {
        method: "DELETE",
        headers: {
          "id_usuario": id_usuario,
          "rol": rol,
        },
      });

      if (response.ok) {
        if (rol && rol.toLowerCase() === "veterinario") {
          navigate("/mascotas-veterinario");
        } else {
          navigate("/mascotas");
        }
      } else {
        console.error("Error en la respuesta del servidor:", await response.text());
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
              value={mascota.nombre}
              onChange={(e) => setMascota({ ...mascota, nombre: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="especie" className="mt-3">
            <Form.Label>Especie</Form.Label>
            <Form.Control
              type="text"
              value={mascota.especie}
              onChange={(e) => setMascota({ ...mascota, especie: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="raza" className="mt-3">
            <Form.Label>Raza</Form.Label>
            <Form.Control
              type="text"
              value={mascota.raza}
              onChange={(e) => setMascota({ ...mascota, raza: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="edad" className="mt-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              value={mascota.edad}
              onChange={(e) => setMascota({ ...mascota, edad: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="peso" className="mt-3">
            <Form.Label>Peso</Form.Label>
            <Form.Control
              type="number"
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
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambios</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas guardar los cambios?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditarMascota;