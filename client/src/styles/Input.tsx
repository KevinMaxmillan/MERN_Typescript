import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...rest }: InputProps) {
  return (
    <InputWrapper>
      <label>{label}</label>
      <input {...rest} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    padding: 12px;
    border: 1px solid #444;
    border-radius: 6px;
    background-color: #2c2c2c;
    color: white;
    font-size: 16px;
    transition: border 0.3s;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;