import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i className='fa-solid fa-truck-fast'></i>,
      title: "Giao hàng quốc tế",
      decs: "Chúng tôi cung cấp đến khách hàng dịch vụ giao hàng quốc tế.",
    },
    {
      cover: <i className='fa-solid fa-id-card'></i>,
      title: "Giao dịch an toàn",
      decs: "Khách hàng được đảm bảo về quá trình mua bán sản phẩm.",
    },
    {
      cover: <i className='fa-solid fa-shield'></i>,
      title: "Tự tin mua sắm",
      decs: "Chúng tôi luôn mang đến những sản phẩm mới nhất trên thị trường.",
    },
    {
      cover: <i className='fa-solid fa-headset'></i>,
      title: "Hỗ trợ 24/7",
      decs: "4Bros luôn hỗ trợ khách hàng 24/7.",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
