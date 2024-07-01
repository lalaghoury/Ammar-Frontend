import React, { useEffect, useState } from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Button, Divider, Flex, Image, Spin, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartThunks, useCartEffect } from "../../redux/slices/cartSlice";
import Paragraph from "antd/es/typography/Paragraph";
import emptyCart from "../../assets/images/emptyCart.png";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import queryString from "query-string";

const CartPage = () => {
  useCartEffect();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const { data: cart, loading } = state;
  const { search } = useLocation();
  const queryParams = queryString.parse(search);
  const orderCancelled = queryParams?.order_cancelled;
  const navigate = useNavigate();

  useEffect(() => {
    const handleCalcelledCheckout = async () => {
      await axios.post(`${process.env.API_URL}/checkout/stripe/cancel`);
    };

    if (orderCancelled) handleCalcelledCheckout();

    const newSearch = search.replace(/order_cancelled=true&?/, "");
    navigate({ search: newSearch });
  }, []);

  const handleUpdateQuantity = (productId, quantity, price) => {
    dispatch(cartThunks.updateQuantity({ productId, quantity, price }));
  };

  const handleDelete = (itemId) => {
    dispatch(cartThunks.deleteCartItem(itemId));
  };

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

      const { data } = await axios.post(
        `${process.env.API_URL}/checkout/stripe`,
        {
          products: cart?.items?.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            name: item.productId.name,
            thumbnail: item.productId.thumbnail,
            price: item.productId.price,
            color: item.color,
            size: item.size,
          })),
          amount: cart?.total,
        }
      );

      if (data.success) {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart.items)
    return (
      <Spin
        size="large"
        className="w-full h-screen flex items-center justify-center"
        spinning={loading}
      />
    );

  return (
    <AppLayout>
      {cart?.items?.length > 0 ? (
        <div>
          <Title>Cart</Title>

          <div>
            <Table
              dataSource={cart?.items}
              pagination={false}
              rowKey={(record) => record._id}
              columns={[
                {
                  title: "Product Details",
                  dataIndex: "productId",
                  key: "details",
                  render: (productId) => (
                    <div className="flex gap-3 items-center justify-between w-full">
                      <span style={{ width: 90 }}>
                        <Image
                          src={productId?.thumbnail}
                          alt={productId?.name}
                          width={90}
                          height={90}
                          className="rounded-[9px] object-center"
                          fallback="https://via.placeholder.com/90x90"
                        />
                      </span>
                      <span style={{ flex: 1 }}>
                        <Title level={5}>{productId?.name}</Title>
                      </span>
                    </div>
                  ),
                },
                {
                  title: "Price",
                  dataIndex: "productId",
                  key: "price",
                  render: (productId) => productId?.price,
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                  render: (quantity, record) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        style={{ marginRight: 8 }}
                        disabled={quantity === 1}
                        onClick={() =>
                          handleUpdateQuantity(
                            record.productId?._id,
                            quantity - 1,
                            record.productId?.price
                          )
                        }
                      >
                        -
                      </Button>
                      <span>{quantity}</span>
                      <Button
                        style={{ marginLeft: 8 }}
                        onClick={() =>
                          handleUpdateQuantity(
                            record.productId?._id,
                            quantity + 1,
                            record.productId?.price
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                  ),
                },
                {
                  title: "Shipping",
                  dataIndex: "productId",
                  key: "shipping",
                  render: (productId) =>
                    productId.shipping === 0 ? "Free" : productId.shipping,
                },
                {
                  title: "Remove",
                  dataIndex: "productId",
                  key: "remove",
                  render: (_, record) => (
                    <>
                      <Button
                        type="warning"
                        color="#8A33FD"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record._id)}
                      />
                    </>
                  ),
                },
              ]}
            />
          </div>

          <Flex
            justify="flex-end"
            style={{
              width: "100%",
              background: "#F6F6F6",
            }}
            className={`p-10`}
          >
            <PriceDetails handlePayment={handlePayment} />
          </Flex>
        </div>
      ) : (
        <EmptyCart />
      )}
    </AppLayout>
  );
};

export const PriceDetails = ({ handlePayment }) => {
  const { data: cart } = useSelector((state) => state.cart);

  return (
    <div className="p-10 w-1/3">
      <Flex justify="center" vertical align="flex-start">
        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Flex align="center" gap={4}>
            <Title level={5} style={{ margin: 0 }}>
              Total
            </Title>
            <Paragraph style={{ margin: 0 }}>
              ( {cart?.items?.length}{" "}
              {cart?.items?.length > 1 ? "items" : "item"} )
            </Paragraph>
          </Flex>
          <Title level={5} style={{ margin: 0 }}>
            ${cart?.total}
          </Title>
        </Flex>

        <Divider className="sm-divider" />

        <Button
          style={{ marginTop: 16 }}
          type="primary"
          onClick={handlePayment}
          block
        >
          Proceed to Checkout
        </Button>
      </Flex>
    </div>
  );
};

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="dis-fcc">
      <Flex
        vertical
        gap={12}
        style={{ width: "100%", borderRadius: 12 }}
        align="center"
      >
        <Image
          src={emptyCart}
          alt="empty cart img"
          width={450}
          height={300}
          style={{ objectFit: "contain" }}
          preview={false}
        />
        <Title>Your cart is empty and sad :(</Title>
        <Paragraph>Add something to make it happy!</Paragraph>
        <Button onClick={() => navigate("/shop")} type="primary">
          Continue Shopping
        </Button>
      </Flex>
    </div>
  );
};

export default CartPage;
