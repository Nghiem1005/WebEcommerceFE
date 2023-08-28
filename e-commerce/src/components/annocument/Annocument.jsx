import React from "react"

const Annocument = () => {
  const mystyle = {
    width: "30%",
    height: "340px",
  }
  const mystyle1 = {
    width: "68%",
    height: "340px",
  }
  return (
    <>
      <section className='annocument background display1'>
        <div className='container d_flex'>
          <div className='img' style={mystyle}>
            <img src='https://th.bing.com/th/id/OIP.KauK9EviUJOXd3FStztY0wHaHO?w=206&h=200&c=7&r=0&o=5&pid=1.7' width='100%' height='100%' />
          </div>
          <div className='img' style={mystyle1}>
            <img src='https://cdn.tgdd.vn/2022/11/banner/Big-Campaign-Desktop-min-1920x450.jpg' width='100%' height='100%' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Annocument
