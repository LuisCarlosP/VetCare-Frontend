import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner, Modal } from "react-bootstrap";

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const id_usuario = localStorage.getItem("id_usuario");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${id}`);
        const data = await response.json();

        if (response.ok) {
          if (Number(id_usuario) !== data.id_usuario) {
            setError("No tienes permiso para editar este usuario.");
            setLoading(false);
            return;
          }
          setUsuario(data);
        } else {
          setError("No se pudo cargar la información del usuario.");
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setError("Hubo un error al obtener la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id, id_usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "id_usuario": id_usuario,
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        console.error("Error en la respuesta del servidor:", await response.text());
        setError("Hubo un error al editar el usuario.");
      }
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      setError("Hubo un error al editar el usuario.");
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center">Editar Usuario</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {usuario && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={usuario.nombre}
              onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="apellido" className="mt-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              value={usuario.apellido}
              onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="telefono" className="mt-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={usuario.telefono}
              onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="direccion" className="mt-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={usuario.direccion}
              onChange={(e) => setUsuario({ ...usuario, direccion: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Guardar Cambios
          </Button>
        </Form>
      )}

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambios</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas guardar los cambios?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditarUsuario;