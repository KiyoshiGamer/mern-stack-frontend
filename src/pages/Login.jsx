import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password)
    setEmail("")
    setPassword("")
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded bg-white"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center fw-bold mb-4">Login</h3>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Remember Me + Forgot */}
        <div className="d-flex justify-content-between mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="#" className="text-decoration-none">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button disabled={loading} className="btn btn-success w-100">
          Log In
        </button>
        {error && <div className="text-danger">{error}</div>}

        {/* Signup Link */}
        <p className="text-center mt-3 mb-0">
          Don’t have an account? <a href="#">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
