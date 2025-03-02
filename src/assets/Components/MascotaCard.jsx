import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MascotaCard = ({ mascota }) => {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  return (
    <Card className="shadow-lg" style={{ border: "2px solid #001f3d", borderRadius: "8px", backgroundColor: "#f4f4f4" }}>
      <Card.Body>
        <Card.Title>{mascota.nombre}</Card.Title>
        <Card.Text>
          {rol && rol.toLowerCase() === "veterinario" && (
            <>
              <strong>ID:</strong> {mascota.idMascota}
              <br />
            </>
          )}
          <strong>Especie:</strong> {mascota.especie}
          <br />
          <strong>Raza:</strong> {mascota.raza}
          <br />
          <strong>Edad:</strong> {mascota.edad} años
          <br />
          <strong>Peso:</strong> {mascota.peso} kg
        </Card.Text>
        <Button variant="info" onClick={() => navigate(`/editar-mascota/${mascota.idMascota}`)}>
          Editar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MascotaCard;