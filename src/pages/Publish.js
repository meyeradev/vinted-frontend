import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Publish({ token }) {
  const [picture, setPicture] = useState({});
  const [title, setTitle] = useState("Titre");
  const [description, setDescription] = useState("Je suis une description");
  const [brand, setBrand] = useState("Nike");
  const [size, setSize] = useState("42");
  const [color, setColor] = useState("Rouge");
  const [condition, setCondition] = useState("Neuf");
  const [city, setCity] = useState("Toulouse");
  const [price, setPrice] = useState(20);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(event) => {
          setPicture(event.target.files[0]);
        }}
      />
      <input
        type="text"
        placeholder="title"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />
      <textarea
        cols="30"
        rows="10"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />
      <input
        type="text"
        placeholder="brand"
        onChange={(event) => setBrand(event.target.value)}
        value={brand}
      />
      <input
        type="text"
        placeholder="size"
        onChange={(event) => setSize(event.target.value)}
        value={size}
      />
      <input
        type="text"
        placeholder="color"
        onChange={(event) => setColor(event.target.value)}
        value={color}
      />
      <input
        type="text"
        placeholder="condition"
        onChange={(event) => setCondition(event.target.value)}
        value={condition}
      />
      <input
        type="text"
        placeholder="city"
        onChange={(event) => setCity(event.target.value)}
        value={city}
      />
      <input
        type="number"
        placeholder="price"
        onChange={(event) => setPrice(event.target.value)}
        value={price}
      />
      <input type="submit" />
    </form>
  ) : (
    <Navigate to="/login" />
  );
}
