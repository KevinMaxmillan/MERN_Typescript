import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import Input from "../styles/Input";
import Button from "../styles/Button";
import { validateLogin } from "../utils/validation";
import { LoginData } from "../interfaces/authInterfaces";
import { FormContainer, AuthContainer, Title } from "../styles/Container";


export default function Login() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    mutate(formData);
  };

  return (
    <AuthContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button className="login" type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </FormContainer>
    </AuthContainer>
  );
}
