import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
