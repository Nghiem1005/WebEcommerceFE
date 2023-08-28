import React from "react"
import Dcard from "./Dcard"

const Discount = ({ productDiscount }) => {
  return (
    <>
      <section className='Discount background NewArrivals'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              <img src='https://img.icons8.com/windows/32/fa314a/gift.png' />
              <h2>Khuyến mãi lớn trong năm</h2>
            </div>
            <div className='heading-right row '>
              <span>Xem tất cả</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <Dcard productDiscount={productDiscount}/>
        </div>
      </section>
    </>
  )
}

export default Discount
