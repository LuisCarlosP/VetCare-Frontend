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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteError, setDeleteError] = useState("");

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

  const handleDelete = async () => {
    if (deleteConfirmation === "CONFIRMAR") {
      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
          method: "DELETE",
          headers: {
            "id_usuario": id_usuario,
          },
        });

        if (response.ok) {
          localStorage.removeItem("rol");
          localStorage.removeItem("id_usuario");
          navigate("/login");
        } else {
          setDeleteError("Hubo un error al eliminar el usuario.");
        }
      } catch (error) {
        setDeleteError("Hubo un error al eliminar el usuario.");
      } finally {
        setShowDeleteModal(false);
      }
    } else {
      setDeleteError("Debes escribir 'CONFIRMAR' para eliminar la cuenta.");
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
      {deleteError && <Alert variant="danger">{deleteError}</Alert>}

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

          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
            className="mt-4 ms-3"
          >
            Eliminar Cuenta
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Escribe <strong>CONFIRMAR</strong> para eliminar tu cuenta.</p>
          <Form.Control
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
          {deleteError && <Alert variant="danger" className="mt-2">{deleteError}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar Cuenta
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditarUsuario;
