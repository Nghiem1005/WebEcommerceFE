import React from "react"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"

const Home = ({ categories, showSidebarCategory }) => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories categories={categories} showSidebarCategory={showSidebarCategory}/>
          <SliderHome />
        </div>
      </section>
    </>
  )
}

export default Home
