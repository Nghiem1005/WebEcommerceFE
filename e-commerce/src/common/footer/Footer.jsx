import React from "react"
import "./style.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <h1>4Bros</h1>
            <p>Chúng tôi luôn mang đến trải nghiệm tốt nhất cho khách hàng. Cửa hàng luôn hoạt động với châm ngôn "Khách hàng hài lòng, chúng tôi hạnh phúc".</p>
            <div className='icon d_flex'>
              <div className='img d_flex'>
                <i className='fa-brands fa-google-play'></i>
                <span>Google Play</span>
              </div>
              <div className='img d_flex'>
                <i className='fa-brands fa-app-store-ios'></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div className='box'>
            <h2>Về chúng tôi</h2>
            <ul>
              <li>Tuyển dụng</li>
              <li>Chuỗi cửa hàng</li>
              <li>Chất lượng phục vụ</li>
              <li>Điều khoản</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Chăm sóc khách hàng</h2>
            <ul>
              <li>Trung tâm trợ giúp </li>
              <li>Tìm hiểU về mua trả góp </li>
              <li>Quản lý đơn hàng </li>
              <li>Chất lượng phục vụ </li>
              <li>Chính sách đổi trả </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Liên hệ</h2>
            <ul>
              <li>Số 1 Võ Văn Ngân, Thành phố Thủ Đức, Thành phố Hồ Chí Minh </li>
              <li>Email: nhom16@gmail.com</li>
              <li>Phone: 0989545454</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
