import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        //   console.log(response.data);
        // Créer un cookie pour enregistrer le token
        setUser(response.data.token);
        // Naviguer vers Home
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="username"
          value={username}
        />
        <br />
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="email"
          value={email}
        />
        <br />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
        <br />
        <span style={{ color: "red" }}>{errorMessage}</span>
        <br />
        <input type="submit" value={"S'inscrire"} />
      </form>
    </div>
  );
};

export default Signup;
