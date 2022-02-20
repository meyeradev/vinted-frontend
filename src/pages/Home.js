import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?limit=${limit}&page=${page}`
      );

      //   console.log("Response ===> ", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="grid-container">
      {data.offers.map((offer) => {
        return (
          <div
            key={offer._id}
            style={{
              width: "400px",
              border: "1px solid black",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            <Link to={`/offer/${offer._id}`}>{offer.product_name}</Link>
            <img
              src={offer.product_image.secure_url}
              alt={offer.product_name}
            />
          </div>
        );
      })}
      <button onClick={() => setPage(page - 1)}>Page précédente</button>
      <button onClick={() => setPage(page + 1)}>Page suivante</button>
    </div>
  );
};

export default Home;
