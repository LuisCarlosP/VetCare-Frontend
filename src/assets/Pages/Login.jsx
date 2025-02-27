import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol) {
      if (rol.toLowerCase() === "veterinario") {
        navigate("/VeterinarioHome");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    setError("");

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorData.message || "Correo o contraseña inválidos",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Correo o contraseña inválidos.",
          });
        }
      } else {
        const data = await response.json();

        if (data.rol) {
          localStorage.setItem("rol", data.rol);
          localStorage.setItem("id_usuario", data.id_usuario);

          if (data.rol.toLowerCase() === "veterinario") {
            navigate("/VeterinarioHome");
          } else {
            navigate("/home");
          }
        } else {
          setError("Rol no válido");
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setError(error.message || "Hubo un error en el servidor. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "25rem" }} className="p-4 shadow-lg">
        <h3 className="text-center">Iniciar Sesión</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
        </Form>

        <Row className="mt-3">
          <Col className="text-center">
            <Link to="/register">
              <Button variant="link" className="text-decoration-none">
                ¿No tienes cuenta? Crear una
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;