import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo / Title */}
        <Link to="/" className="text-decoration-none">
          <h4 className="mb-0 fw-bold text-success">Workout Buddy</h4>
        </Link>

        {/* Navigation */}
        <nav className="d-flex align-items-center gap-3">
          {!user && (
            <>
              <Link
                to="/login"
                className="text-decoration-none text-dark fw-medium"
              >
                Login
              </Link>

              <Link to="/signup" className="btn btn-success px-3">
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <span>{user.email}</span>
              <button className="btn btn-secondary px-3" onClick={handleClick}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
