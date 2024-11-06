import React from "react";
import { Container, Nav } from "react-bootstrap";
import "./../HomePage.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <p>&copy; 2024 E-commerce - All Rights Reserved.</p>
        <Nav className="justify-content-center">
          <Nav.Link href="/privacy">Privacy Policy</Nav.Link>
          <Nav.Link href="/terms">Terms of Service</Nav.Link>
        </Nav>
      </Container>
    </footer>
  );
}
