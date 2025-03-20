import { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import Input from "../styles/Input";
import Button from "../styles/Button";
import { validateRegister } from "../utils/validation";
import { RegisterData } from "../interfaces/authInterfaces";
import { FormContainer, AuthContainer, Title } from "../styles/Container";


export default function Register() {
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRegister(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    mutate(formData);
  };

  return (
    <AuthContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
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
        <Button className="register" type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
      </FormContainer>
    </AuthContainer>
  );
}
