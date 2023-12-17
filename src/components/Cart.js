import { useEffect } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/products-slice";
import { clear, deleteFromCart } from "../rtk/slices/cart-slice";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <Container>
      <h1 className="py-5">welcome to products cart </h1>
      <h5>
        The Total Price is<span> </span>
        <span style={{ color: "green" }}>{totalPrice.toFixed(2)}$</span>
      </h5>
      <Button
        onClick={() => dispatch(clear())}
        variant="primary"
        className="mb-3"
      >
        Clear All Products
      </Button>
      <Table striped bordered hover className="py-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((el) => {
            return (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.title}</td>
                <td>
                  <img
                    src={el.image}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                </td>
                <td style={{ color: "green" }}>{el.price}$</td>
                <td style={{ textAlign: "center" }}>
                  <Badge pill bg="secondary" className="m-2">
                    {el.quantity}
                  </Badge>

                  <Button
                    variant="danger"
                    onClick={() => dispatch(deleteFromCart(el))}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
export default Cart;
