import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Slider,
  Spin,
  Divider,
  Flex,
  Image,
  Tooltip,
  Button,
  Collapse,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../config/AppLayout/AppLayout";
import "./Shop.scss";
import { DownOutlined } from "@ant-design/icons";
import WishlistButton from "../WishlistButton";
import CommonHeading from "../CommonHeading/CommonHeading";
import FooterUser from "../Footer/Footer";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("");
  const [dressStyle, setDressStyle] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [DressStyleNames, setDressStyleNames] = useState([]);
  const [numberOfLoadedProducts, setNumberOfLoadedProducts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.API_URL}/categories/names`);
        setCategoriesNames(res.data.categoriesNames);
        const res2 = await axios.get(
          `${process.env.API_URL}/dress-styles/names`
        );
        setDressStyleNames(res2.data.DressStylesNames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.API_URL}/products/filter`,
          {
            params: {
              minPrice,
              maxPrice,
              category,
              dressStyle,
              colors,
              sizes,
              limit: 3,
            },
          }
        );

        if (data.success) {
          setProducts((prevProducts) => [...prevProducts, ...data.products]);
          setNumberOfLoadedProducts(
            (prevCount) => prevCount + data.products.length
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error.response.data.message);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [minPrice, maxPrice, category, dressStyle, colors, sizes]);

  const handlePriceRangeChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleReset = () => {
    setCategory("");
    setDressStyle("");
    setColors([]);
    setSizes([]);
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const items = [
    {
      key: "1",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">
          Categories
        </h1>
      ),
      children: (
        <div>
          {categoriesNames?.map((categoryObj) => (
            <p
              className="cursor-pointer pb-2 text-[#444]  font-semibold leading-[normal]"
              onClick={() => setCategory(categoryObj._id)}
            >
              {categoryObj?.name}
            </p>
          ))}
          <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
        </div>
      ),
    },

    {
      key: "2",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">Price</h1>
      ),
      children: (
        <div>
          <Slider
            range
            min={0}
            max={1000}
            value={[minPrice, maxPrice]}
            onChange={handlePriceRangeChange}
            className="mb-5 text-[#8A33FD]"
          />
          <Flex align="center" gap={10}>
            <Flex align="center" gap={5} vertical>
              <Input
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="min price"
                type="number"
                min={minPrice}
                max={1000}
                step="10"
              />
            </Flex>
            <Flex align="center" gap={5} vertical>
              <Input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="max price"
                type="number"
                min={minPrice}
                max={1000}
                step="10"
              />
            </Flex>
          </Flex>
          <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
        </div>
      ),
    },

    {
      key: "3",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">
          Colors
        </h1>
      ),
      children: <Colors colors={colors} setColors={setColors} />,
    },

    {
      key: "4",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">Size</h1>
      ),
      children: <Sizes sizes={sizes} setSizes={setSizes} />,
    },

    {
      key: "5",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">
          Dress Styles
        </h1>
      ),
      children: (
        <div>
          {DressStyleNames?.map((Obj) => (
            <p
              className="cursor-pointer pb-2 text-[#444]  font-semibold leading-[normal]"
              onClick={() => setDressStyle(Obj?._id)}
            >
              {Obj?.name}
            </p>
          ))}
          <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
        </div>
      ),
    },
  ];

  async function loadMoreProducts() {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/products/lazy-load`,
        {
          params: {
            offset: numberOfLoadedProducts,
            limit: 3,
          },
        }
      );
      if (response.data.success) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.products,
        ]);
        setNumberOfLoadedProducts(
          (prevCount) => prevCount + response.data.products.length
        );
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMoreProducts();
    }
  }

  return (
    <div>
      <AppLayout>
        <Spin spinning={loading} tip="Loading..." className="w-full">
          <Flex gap={50} className="shop-container justify-between w-full">
            <div className="flex flex-col font-['Causten'] w-[295px]">
              <div className="w-full flex items-center justify-between">
                <div className="flex gap-[10px] items-center justify-between w-full">
                  <h2 className="filter text-[#807d7e] text-[1.375rem] font-semibold leading-[normal]">
                    Filters
                  </h2>
                  <Tooltip title="Filters">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                    >
                      <path
                        d="M2.83333 6.33333L2.83333 1.75M2.83333 18.25L2.83333 10M13.8333 18.25L13.8333 10M8.33333 18.25V13.6667M8.33333 10V1.75M13.8333 6.33333L13.8333 1.75M1 6.33333H4.66667M6.5 13.6667H10.1667M12 6.33333L15.6667 6.33333"
                        stroke="#807D7E"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Tooltip>
                </div>
              </div>
              <Divider className="h-px opacity-[0.4] bg-[#bebcbd]" />

              <Collapse
                size="large"
                expandIconPosition={"end"}
                bordered={false}
                expandIcon={({ isActive }) => (
                  <DownOutlined rotate={isActive ? 180 : 0} />
                )}
                defaultActiveKey={["3"]}
                ghost
                accordion
                items={items}
                className="!p-0"
              />
              <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />

              <Button onClick={handleReset} className="w-full">
                Reset all filters
              </Button>
            </div>
            <div className="w-[1095px]">
              <CommonHeading text={"Shop"} className={"!mt-0"} />
              <div
                id="product-list"
                className="card-wrap flex flex-wrap justify-between gap-[24px]"
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={`card card${index} rounded-lg w-[282px] h-[460px] bg-white mb-[50px] relative cursor-pointer overflow-hidden`}
                  >
                    <Image
                      className="hover:scale-110 ease-in-out duration-500 rounded-lg object-cover"
                      onClick={() => navigate(`/product/${product?._id}`)}
                      src={product?.images[0]?.url}
                      alt={product.name}
                      width={282}
                      height={370}
                      preview={false}
                    />
                    <WishlistButton
                      wishlists={product?.wishlists}
                      productId={product?._id}
                    />
                    <div className="flex justify-between items-center mt-[30px] px-1">
                      <div
                        key={product?._id}
                        className="flex flex-col gap-[5px]"
                      >
                        <Link to={`/product/${product?._id}`}>
                          <span className="text-[20px] text-[#3c4242] font-['Causten'] font-semibold leading-[normal] capitalize">
                            {product?.name}
                          </span>
                        </Link>
                        <div className="text-[#807D7E] font-['Causten'] text-sm leading-[normal]">
                          {product?.brand}
                        </div>
                      </div>
                      <p className="dis-fcc text-[#3c4242] font-['Causten'] text-sm font-bold leading-[normal] rounded-lg bg-[#F6F6F6] w-[82px] h-[37px]">
                        {Intl.NumberFormat(undefined, {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(product?.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Flex>
        </Spin>
      </AppLayout>
      {/* <FooterUser /> */}
    </div>
  );
};

const Colors = ({ colors, setColors }) => {
  const colorsArr = [
    { colorName: "Purple", backgroundColor: "#8434E1" },
    { colorName: "Black", backgroundColor: "#252525" },
    { colorName: "Red", backgroundColor: "#F35528" },
    { colorName: "Orange", backgroundColor: "#F16F2B" },
    { colorName: "Navy", backgroundColor: "#345EFF" },
    { colorName: "White", backgroundColor: "#FFF" },
    { colorName: "Broom", backgroundColor: "#D67E3B" },
    { colorName: "Green", backgroundColor: "#48BC4E" },
    { colorName: "Yellow", backgroundColor: "#FDC761" },
    { colorName: "Grey", backgroundColor: "#E4E5E8" },
    { colorName: "Pink", backgroundColor: "#E08D9D" },
    { colorName: "Blue", backgroundColor: "#3FDEFF" },
  ];

  const handleColorClick = (addedColor) => {
    const newColors = colors.includes(addedColor)
      ? colors.filter((color) => color !== addedColor)
      : [...colors, addedColor];
    setColors(newColors);

    const divElement = document.getElementById(`${addedColor}`);

    const divChildElement = document.querySelector(
      `#${addedColor} #${addedColor}`
    );

    if (colors.includes(addedColor)) {
      divElement.style.color = "";
      divChildElement.style.border = "";
    } else {
      divElement.style.color = "#8a33fd";
      divChildElement.style.border = "#ddd dashed 3px";
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        {colorsArr.map((color, index) => (
          <div
            className="color-swatch flex flex-col items-center justify-center gap-2 item"
            onClick={() => handleColorClick(color.colorName)}
            id={color.colorName}
            key={index}
          >
            <div
              className="color-block w-12 h-12 rounded-xl cursor-pointer"
              id={color.colorName}
              style={{ backgroundColor: color.backgroundColor }}
            />
            <div className="color-name text-sm font-semibold cursor-pointer">
              {color.colorName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Sizes = ({ sizes, setSizes }) => {
  const generateSizeItems = () => {
    return ["XXS", "XL", "XS", "S", "M", "L", "XXL", "3XL", "4XL"].map(
      (size) => (
        <div
          className="text-[#3C4242] flex justify-center items-center w-[58px] h-9 rounded-lg border-solid border-2 border-[#BEBCBD] cursor-pointer"
          onClick={() => handleSizeClick(size)}
          key={size}
          id={size}
        >
          {size}
        </div>
      )
    );
  };

  const handleSizeClick = (addedSize) => {
    const newSizes = sizes.includes(addedSize)
      ? sizes.filter((size) => size !== addedSize)
      : [...sizes, addedSize];

    setSizes(newSizes);

    const divElement = document.getElementById(`${addedSize}`);
    if (sizes.includes(addedSize)) {
      divElement.style.backgroundColor = "#fff";
      divElement.style.color = "#807d7e";
    } else {
      divElement.style.backgroundColor = "#807d7e";
      divElement.style.color = "#fff";
    }
  };
  return (
    <div>
      <div className={`flex gap-[20px] flex-wrap`}>{generateSizeItems()}</div>
      <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
    </div>
  );
};

export default Shop;
