import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
`;

export const FormContainer = styled.form`
  max-width: 400px;
  width: 100%;
  background: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`;
