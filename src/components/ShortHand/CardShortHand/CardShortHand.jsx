import React, { useEffect, useState } from "react";
import { Flex, Image, Modal, Spin, message } from "antd";
import AppLayout from "../../../config/AppLayout/AppLayout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CommonHeading from "../../CommonHeading/CommonHeading";
import WishlistButton from "../../WishlistButton";
import { useSelector, useDispatch } from "react-redux";
import { cartThunks } from "../../../redux/slices/cartSlice";

const CardShortHand = ({ text, apiUrl, color, width, height, slice }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleAddToCartClick = (productId, price, quantity = 1) => {
    if (!auth.user) {
      Modal.info({
        title: "Please login to continue",
        content: "You need to login to add a product to your cart",
        onOk() {
          navigate("/sign-in");
        },
      });
    } else if (auth.user) {
      dispatch(
        cartThunks.addToCart({
          productId,
          quantity,
          price,
        })
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(apiUrl);
        if (data.success) {
          {
            slice
              ? setProducts(data.products.slice(0, slice))
              : setProducts(data.products);
          }
        }
      } catch (error) {
        console.error("Error fetching Products:", error.response.data);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slice]);

  return (
    <AppLayout>
      <Spin spinning={loading} tip="Loading...">
        <CommonHeading text={text} />
        <Flex gap={10} wrap="wrap" justify="space-between">
          {products.map((product) => (
            <div
              key={product?._id}
              className="rounded-lg w-[282px] h-[441px] bg-white mb-[50px] relative cursor-pointer overflow-hidden"
            >
              <Image
                src={product?.images[0]?.url}
                alt={product.name}
                width={282}
                height={370}
                preview={false}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
                className="hover:scale-110 ease-in-out duration-500"
              />
              <WishlistButton
                wishlists={product?.wishlists}
                productId={product?._id}
              />
              <div className="flex justify-between items-center mt-[30px]">
                <div key={product?._id} className="flex flex-col gap-[5px]">
                  <Link to={`/product/${product?._id}`}>
                    <span className="text-[20px] text-[#3c4242] font-['Causten'] font-semibold leading-[normal] capitalize">
                      {product?.name}
                    </span>
                  </Link>
                  <div className="text-[#807D7E] font-['Causten'] text-sm leading-[normal]">
                    {product?.brand}
                  </div>
                </div>
                <span className="dis-fcc text-[#3c4242] font-['Causten'] text-sm font-bold leading-[normal] rounded-lg bg-[#F6F6F6] w-[82px] h-[37px]">
                  {product.currency === "USD" ? (
                    <p>${product.price}</p>
                  ) : product.currency === "PKR" ? (
                    <p>Rs. {product.price}</p>
                  ) : product.currency === "EUR" ? (
                    <p>&euro; {product.price}</p>
                  ) : product.currency === "RON" ? (
                    <p>lei {product.price}</p>
                  ) : (
                    <p>UNKNOWN CURRENCY</p>
                  )}
                  .00
                </span>
              </div>
            </div>
          ))}
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default CardShortHand;
