import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  padding: 15px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;

    &:hover {
      color: #007bff;
    }
  }
`;

export const NavButton = styled.button`
  background-color: #ff4b5c;
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;
