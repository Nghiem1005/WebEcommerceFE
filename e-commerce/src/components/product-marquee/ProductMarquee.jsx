import React from "react"
import { Link } from "react-router-dom"
import './Product.css'

const Product = ({ image }) => {
    return (
        <div>
            <Link href={`/product`}>
                <div className='product-card'>
                    <img src={image} alt='asd' 
                    width={250} height={250} className='product-image'/>
                    <p className="product-name">'Product'</p>
                    <p className="product-price">20,000 VND</p>
                </div>
            </Link>
        </div>
    )
}

export default Product