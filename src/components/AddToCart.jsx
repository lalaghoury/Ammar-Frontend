import { useEffect, useState } from "react";
import { Modal, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartThunks, useCartEffect } from "../redux/slices/cartSlice";

const AddToCartButton = ({ price, productId, quantity = 1 }) => {
  useCartEffect();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: cart, loading } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [InCart, setInCart] = useState(false);
  const itemId = productId;

  const handleNotLoggedIn = () => {
    Modal.info({
      title: "Please login to continue",
      content: "You need to login to add a product to your cart",
      onOk() {
        navigate("/sign-in");
      },
    });
  };

  const handleAddToCartClick = () => {
    if (!auth?.user) {
      handleNotLoggedIn();
      return;
    } else {
      dispatch(
        cartThunks.addToCart({
          productId,
          quantity,
          price,
        })
      );
      setInCart(true);
    }
  };

  const handleDelete = () => {
    const itemOfCartByProductId = cart?.items?.find((item) => {
      if (typeof item.productId === "string" && item.productId === productId) {
        return true;
      }
      if (
        typeof item.productId === "object" &&
        item.productId._id === productId
      ) {
        return true;
      }
      return false;
    })._id;

    if (!auth?.user) {
      handleNotLoggedIn();
      return;
    } else {
      dispatch(cartThunks.deleteCartItem(itemOfCartByProductId));
      setInCart(false);
    }
  };

  useEffect(() => {
    const isInCart = cart?.items?.some((item) => {
      if (typeof item.productId === "string" && item.productId === productId) {
        return true;
      }
      if (
        typeof item.productId === "object" &&
        item.productId._id === productId
      ) {
        return true;
      }
      return false;
    });

    setInCart(isInCart);
  }, [productId, cart]);

  return (
    <div
      onClick={!InCart ? handleAddToCartClick : handleDelete}
      className={`flex justify-center items-center rounded-full cursor-pointer bg-white w-8 h-8 absolute top-[70px] right-[21px] ${
        loading && "bouncing-button"
      } `}
    >
      {!InCart ? (
        <Tooltip title="Add to cart!">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={"none"}
          >
            <path
              d="M2.5 3.33334H3.00526C3.85578 3.33334 4.56986 3.97376 4.6621 4.81926L5.3379 11.0141C5.43014 11.8596 6.14422 12.5 6.99474 12.5H14.205C14.9669 12.5 15.6317 11.9834 15.82 11.2452L16.9699 6.73593C17.2387 5.68213 16.4425 4.65742 15.355 4.65742H5.5M5.52063 15.5208H6.14563M5.52063 16.1458H6.14563M14.6873 15.5208H15.3123M14.6873 16.1458H15.3123M6.66667 15.8333C6.66667 16.2936 6.29357 16.6667 5.83333 16.6667C5.3731 16.6667 5 16.2936 5 15.8333C5 15.3731 5.3731 15 5.83333 15C6.29357 15 6.66667 15.3731 6.66667 15.8333ZM15.8333 15.8333C15.8333 16.2936 15.4602 16.6667 15 16.6667C14.5398 16.6667 14.1667 16.2936 14.1667 15.8333C14.1667 15.3731 14.5398 15 15 15C15.4602 15 15.8333 15.3731 15.8333 15.8333Z"
              stroke="#807D7E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Tooltip>
      ) : (
        <Tooltip title="Remove from cart?">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={InCart ? "#8A33FD" : "none"}
          >
            <path
              d="M2.5 3.33334H3.00526C3.85578 3.33334 4.56986 3.97376 4.6621 4.81926L5.3379 11.0141C5.43014 11.8596 6.14422 12.5 6.99474 12.5H14.205C14.9669 12.5 15.6317 11.9834 15.82 11.2452L16.9699 6.73593C17.2387 5.68213 16.4425 4.65742 15.355 4.65742H5.5M5.52063 15.5208H6.14563M5.52063 16.1458H6.14563M14.6873 15.5208H15.3123M14.6873 16.1458H15.3123M6.66667 15.8333C6.66667 16.2936 6.29357 16.6667 5.83333 16.6667C5.3731 16.6667 5 16.2936 5 15.8333C5 15.3731 5.3731 15 5.83333 15C6.29357 15 6.66667 15.3731 6.66667 15.8333ZM15.8333 15.8333C15.8333 16.2936 15.4602 16.6667 15 16.6667C14.5398 16.6667 14.1667 16.2936 14.1667 15.8333C14.1667 15.3731 14.5398 15 15 15C15.4602 15 15.8333 15.3731 15.8333 15.8333Z"
              stroke="#807D7E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Tooltip>
      )}
    </div>
  );
};

export default AddToCartButton;
