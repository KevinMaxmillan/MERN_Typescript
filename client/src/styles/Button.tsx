import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; 
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <StyledButton className={className} {...rest}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;

  &.register {
    background-color: #28a745;
    color: white;
    &:hover {
      background-color: #218838;
    }
  }

  &.login {
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  }

  &.logout {
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  }

  &.default {
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #5a6268;
    }
  }
`;
