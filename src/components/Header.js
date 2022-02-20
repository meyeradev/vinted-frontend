import { Link } from "react-router-dom";

export default function Header({ token, setUser }) {
  return (
    <header>
      {token !== null ? (
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <>
          <Link to="/login">Se connecter</Link>
          <br />
          <Link to="/signup">S'inscrire</Link>
        </>
      )}
      <Link to="/publish">Poster une offre</Link>
    </header>
  );
}
