import React, { useState, useEffect } from "react";
import Base from "../../Base/Base";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { delCartItem, getCartItem } from '../../actions/cartActions'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const { isAuthenticated} = useSelector(state => state.authState)
  const { isAdded, product, error } = useSelector(state => state.cartState)




  useEffect(() => {
    dispatch(getCartItem())
  }, [])

console.log(product);

  const [count, setCount] = useState()

  const handleInc = () => {
    setCount(count + 1)
  }
  const handleDec = () => {
    setCount(count - 1)
  }


  const handleDel = (id) => {
    dispatch(delCartItem(id ))
    if (error) {
      return (toast(error, {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      }))
    }
    dispatch(getCartItem())
    toast('Item Deleted Successfully', {
      type: 'success',
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  const handleProductPage = (item) => {
    console.log(item.product.name);
    navigate(`/product/${item.product._id}`, { state: { item } });
  };


  return (
    <>
    
      {
        isAuthenticated ?     <Base>
        {
          isAdded ?
            <div className="cart-box-container">
            <div className="back-btn">
        <button  onClick={()=>navigate(-1)}>BACK</button>

        </div>
              {
                product.length == 0 ? <h1 style={{ margin: '15rem 25rem' }}>Your Cart is Empty</h1> :
                  <>
                    <div className="cart-container row" style={{ position: "relative" }}>
                    <>
                      {
                        product && product.map((item) => (
                          <div className="cart-details-container col-6" style={{ width: "100%" }}>
                            <div className="row cart-box">
                              <div className="col-4 cart-img" style={{ width: "30%", padding: "10px" }}>
                                <img
                                  alt="img"
                                  src={item.product.images[0].image}
                                />
                              </div>
                              <div className="col-4" style={{ width: "50%" }}>
                                <h4 className="cart-product-name" onClick={()=>handleProductPage(item)}>
                                  {item.product.name}
                                </h4>
                                <p style={{ color: "#878787",textTransform:"capitalize" }} className="seller-name">Seller:{item.product.user.username}</p>
                                <br />
                                <h4 className="cart-product-price">
                                  <strike style={{ color: "#878787" }}>₹1,49,999</strike>{" "}
                                  ₹{item.product.price}
                                </h4>
                                <div className="cart-add-items row" >
                                <div className="stockCounter d-inline"  >
                                  <span className="btn btn-danger  " onClick={handleDec} >-</span>
  
                                  <input type="number" className="form-control count d-inline"
                                  value={item.product.stock} readOnly />
  
                                  <span className="btn btn-primary plus" onClick={handleInc}>+</span>
                                </div>
                                
                              </div>
                                <h6 style={{ color: "green", fontWeight: "600" }} className="cart-product-offer">16% Off</h6>
                                <div className="cart-links">
                                <h6 className="cart-product-name" style={{ fontWeight: "550" }}>SAVE FOR LATER</h6>
                                <h6
                                  className="cart-product-name1"
                                  style={{ paddingLeft: "40px", fontWeight: "550" }}
                                  onClick={() => handleDel(item._id)}
                                >REMOVE</h6> 
                                </div>
                                 
                              </div>
                              <div className="col-4 cart-dispatch-detail" style={{ width: "20%" }}>
                                <p>
                                  Delivery by Sun Sep 24 |
                                  <span style={{ color: "green" }}>
                                    <strike style={{ color: "#878787" }}>₹40</strike> Free
                                  </span>
                                </p>
                              </div>
                              
                            </div>
                          </div>
  
  
                        ))
                      }
                      <div className="cart-buy-container">
                      <div className="total-buy-box">
                      <h4 className="total-product">Total Product : {product.length}</h4>
                     <h3 className="total-price">Total Price : </h3>
                      <button>Buy Now</button>
                      </div>
                      </div>
                      </>
                     
                    </div>
                    <div className="mobile-cart-container">
                    {
                      product && product.map((item)=>(
                        <div className="mobile-cart-products">
                        <div className="mobile-cart-product-img">
                        <img src={item.product.images[0].image} alt="img"/>
                        <div className="mobile-cart-product-detail">
                        <p className="mobile-cart-p-name">{item.product.name}</p>
                        <p className="mobile-cart-p-name">₹{item.product.price}</p>
                        <div className="mobile-cart-no"><div className="mobile-cart-inc">+</div>
                        <input type="read" value="6"/><div className="mobile-cart-dec">-</div>
                        </div>
                        </div>
                        
                        </div>
                        
                        </div>
                       
                      ))
                    }
                    <div className="mobile-cart-price">
                    
                        <div className="mobile-cart-p-quantity">Total Product:{product.length}</div>
                        <div className="m-b-p-price">₹94757</div>
                        <div className="mobile-cart-buy-btn">
                        <button>Buy Now</button>
                        </div>
                        </div>
                       
                    </div>

                  </>
                  
              }
            </div>
            : null
  
        }
      </Base> : navigate('/')
      }
    </>


  );
}



