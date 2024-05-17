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
  Layout,
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
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("");
  const [dressStyle, setDressStyle] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [DressStyleNames, setDressStyleNames] = useState([]);
  const [open, setOpen] = useState(true);
  const [numberOfLoadedProducts, setNumberOfLoadedProducts] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const siderWidth = 250;

  const SiderContent = () => (
    <div className="sider-content">
      <div className="flex flex-col font-['Causten'] w-[30%]">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-[10px] items-center justify-between w-full cursor-pointer">
            <h2 className="filter text-[#807d7e] text-[1.375rem] font-semibold leading-[normal]">
              Filters
            </h2>
            <Tooltip title="Hide" onClick={() => setOpen(!open)}>
              <DownOutlined
                onClick={() => setOpen(!open)}
                style={{ rotate: "90deg" }}
              />
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
    </div>
  );

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(`${process.env.API_URL}/categories/names`);
  //       setCategoriesNames(res.data.categoriesNames);
  //       const res2 = await axios.get(
  //         `${process.env.API_URL}/dress-styles/names`
  //       );
  //       setDressStyleNames(res2.data.DressStylesNames);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
            offset: numberOfLoadedProducts,
          },
        }
      );

      if (data.success) {
        setProducts((prevData) => [...prevData, ...data.products]);
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

  // useEffect(() => {
  //   fetchData();
  // }, [minPrice, maxPrice, category, dressStyle, colors, sizes]);

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
              key={categoryObj._id}
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
              key={Obj?._id}
            >
              {Obj?.name}
            </p>
          ))}
          <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
        </div>
      ),
    },
  ];

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  function handleScroll() {
    if (
      window.innerHeight + (document.documentElement.scrollTop + 770) >=
      document.documentElement.scrollHeight
    ) {
      fetchData();
    }
  } 

  const handleCollapseChange = (value) => {
    setOpen(value.length > 0); // Open only if at least one panel is expanded
  };

  return (
    <div>
      <AppLayout>
        <Spin spinning={loading} tip="Loading..." className="w-full">
          <Flex gap={50} className="shop-container justify-between w-full">
            {/* Left portion = collapse */}
            <Collapse
              bordered={false} // Remove border for cleaner look
              expandIconPosition={"end"} // Position expand icon at the end
              // accordion // Only allow one panel to be open at a time
              activeKey={open ? ["1"] : []} // Set initial active key to open
              onChange={handleCollapseChange}
              className="!p-0" // Remove default padding
            >
              {items.map((item) => (
                <Collapse.Panel header={item.label} key={item.key}>
                  {item.children}
                </Collapse.Panel>
              ))}
            </Collapse>
          </Flex>
        </Spin>
        <Layout className="shop-layout">
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            width={siderWidth}
            trigger={null} // Remove default trigger
            onCollapse={handleCollapse}
          >
            <SiderContent />
          </Layout.Sider>
          <Layout.Content>
            <Spin spinning={loading} tip="Loading..." className="w-full">
              {/* ... your product list content */}
              {/* Right portion = Products List */}
              <div className="w-full flex flex-col items-start">
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
                        loading="lazy"
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
            </Spin>
          </Layout.Content>
        </Layout>
      </AppLayout>
      <FooterUser />
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
