import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            {/* <i className='fa fa-phone'></i> */}
            {/* <i className='fa fa-envelope'></i> */}
            <label> Nhóm 16 </label>
            {/* <label> Nhóm 31 </label> */}
            <i className="fa fa-user"></i>
            <label> GVHD: Thầy Nguyễn Trường Hải</label>
          </div>
          <div className='right row RText'>
            <label>Môn học: Thương mại điện tử</label>
            {/* <label>Môn học: Công nghệ phần mềm mới</label> */}
            {/* <label>Need Help?</label> */}
            {/* <span>🏳️‍⚧️</span>
            <label>EN</label>
            <span>🏳️‍⚧️</span>
            <label>USD</label> */}
            
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
