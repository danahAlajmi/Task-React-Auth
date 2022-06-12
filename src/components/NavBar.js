import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import authStore from "../stores/authStore";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import SignoutButton from "./SignoutButton";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/products">
          <Navbar.Brand>Chicken Shop</Navbar.Brand>
        </Link>
        <Nav>
          {authStore.user ? (
            <>
              <h1 style={{ color: "white" }}>Hello {authStore.user.name}</h1> ;
              <SignoutButton />
            </>
          ) : (
            <>
              <SignupModal />
              <SigninModal />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default observer(NavBar);
