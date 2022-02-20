import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <h2>{data.product_name}</h2>
      <span>{data.product_price}</span>
      {data.product_details.map((elem, index) => {
        const keys = Object.keys(elem); // ["TAILLE"]
        return (
          <div key={index}>
            <span style={{ marginRight: "10px" }}>{keys[0]}</span>
            <span>{elem[keys[0]]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Offer;
