import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaStethoscope } from "react-icons/fa";

const VeterinarioCard = ({ veterinario, onAgendar }) => {
  return (
    <Card className="shadow-sm" style={{ width: "18rem", borderRadius: "8px", padding: "10px" }}>
      <Card.Body>
        <Card.Title className="mb-3" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          {veterinario.nombre} {veterinario.apellido}
        </Card.Title>

        {veterinario.especialidad && (
        <Card.Text className="mb-3 text-muted">
            <FaStethoscope className="mr-2" />
            <strong>Especialidad:</strong> {veterinario.especialidad}
        </Card.Text>
        )}

        
        <Card.Subtitle className="mb-3 text-muted">
          <FaEnvelope className="mr-2" /> {veterinario.email}
        </Card.Subtitle>

        <Card.Subtitle className="mb-3 text-muted">
          <FaPhone className="mr-2" /> {veterinario.telefono}
        </Card.Subtitle>

        <Button variant="primary" onClick={onAgendar} block>
          Agendar cita
        </Button>
      </Card.Body>
    </Card>
  );
};

export default VeterinarioCard;
