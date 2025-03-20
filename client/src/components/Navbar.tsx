import { useUserStore } from "../store/authStore";
import { useLogout } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { NavbarContainer, NavLinks, NavButton } from "../styles/Navbar";

const Navbar = () => {
  const { user } = useUserStore();
  const logoutMutation = useLogout();

  return (
    <NavbarContainer>
      <NavLinks>
        <h2> My App</h2>
        {!user && <Link to="/">Home</Link>}
        {!user && <Link to="/register">Register</Link>}
        {!user && <Link to="/login">Login</Link>}
      </NavLinks>
      {user && <NavButton onClick={() => logoutMutation.mutate()}>Logout</NavButton>}
    </NavbarContainer>
  );
};

export default Navbar;
