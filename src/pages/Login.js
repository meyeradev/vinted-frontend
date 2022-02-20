import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("johndoe@lereacteur.io");
  const [password, setPassword] = useState("azerty");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage("");
      console.log("Test Submit !");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      setUser(response.data.token);
      navigate("/");
    } catch (error) {
      //   console.log(error.response);
      //   console.log(error.message);
      console.log(error.response.status);
      if (error.response.status === 401 || error.response.status === 400) {
        alert("Mauvaise mdp");
        setErrorMessage("Mauvais email et/ou mauvais mot de passe");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Votre Email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          placeholder="Votre Mot de passe"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
