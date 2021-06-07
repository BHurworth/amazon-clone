import React, { useEffect } from "react";
import Product from "../../components/Product";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../actions/productActions";

export default function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
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
