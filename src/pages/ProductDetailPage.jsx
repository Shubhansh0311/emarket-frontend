import Cart from "../components/Cart";
import FooterItem from "../components/Footer";
import Navbar from "../components/Navbar";
import { ADD_TO_CART, ADD_TO_CART_AC, addToCartProduct, CHANGE_ORDER_CART, CHANGE_QUANTITY, fetchProducts, REMOVE_ITEM } from "../action";
import { useDispatch, useSelector } from 'react-redux';// by this we can use particular element of any component
import { useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import { useParams } from "react-router";




//useDispatched for state to props
//useselector for maps to props

const ProductDetailPage = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
dispatch(fetchProducts())
    },[])

    let {productID}=useParams();
 
    
    // console.log(productID);
    // const products = useSelector((store) => store.productItem.Product);
    const savedProducts =JSON.parse(localStorage.getItem('products'));
    console.log(savedProducts);
    
    const product=savedProducts.find(p=>p.id==productID)
    
    // const useProduct = useSelector((store) => store.productItem.Product)


    // for cart functionality


    const cartProduct = useSelector((store) => store.cartItem.item)




    // add cart  functionality
    // const dispatch = useDispatch();
    const addToCart = (AddToCartProduct) => {
        dispatch(addToCartProduct(AddToCartProduct))
    }
    


    return (<>
        <Navbar cartCount={cartProduct.length} />
        <ProductDetails product={product}      addToCart={addToCart} />
        <FooterItem />

    </>)
}
export default ProductDetailPage;