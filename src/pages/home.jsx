import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Productlist from "../components/Productlist";
import FooterItem from "../components/Footer";
import Navbar from "../components/Navbar";
import CarouselItem from "../components/Carousel";
import { addToCartProduct, fetchProducts } from "../action";

const Home = () => {
    const dispatch = useDispatch();

    // State for filtered products and search term
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch products from Redux store
    const products = useSelector((store) => store.productItem.Product);
    const cartProduct = useSelector((store) => store.cartItem.item);

    // Fetch products when the component mounts
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Function to handle search input and filter products
    const handleSearch = (event) => {
        const search = event.target.value.toLowerCase();
        setSearchTerm(search);

        // Filter products based on the search term
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );

        setFilteredProduct(filtered);
    };

    // Function to add product to cart
    const addToCart = (AddToCartProduct) => {
        dispatch(addToCartProduct(AddToCartProduct));
    };

    return (
        <>
            <Navbar cartCount={cartProduct.length} searchTerm={searchTerm} handleSearch={handleSearch} />
            <CarouselItem />
            <Productlist sendProduct={filteredProduct.length > 0 ? filteredProduct : products} addToCart={addToCart} />
            <FooterItem />
        </>
    );
};

export default Home;
