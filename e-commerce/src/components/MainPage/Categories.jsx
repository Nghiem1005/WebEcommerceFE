import React from "react"
import { Link } from "react-router-dom"

const Categories = ({ categories, showSidebarCategory }) => {
  const data = [
    {
      cateImg: "./images/category/Cate-logo/mobile-logo.png",
    },
    {
      cateImg: "./images/category/Cate-logo/tablet-logo.png",
    },
    {
      cateImg: "./images/category/Cate-logo/case-logo.png",
    },
    {
      cateImg: "./images/category/Cate-logo/charger-logo.png",
    },
    {
      cateImg: "./images/category/Cate-logo/earphone-logo.png",
    },
    {
      cateImg: "./images/category/Cate-logo/bt-earphone-logo.png",
    },
    {
      cateImg: "./images/category/cat7.png",
    },
    {
      cateImg: "./images/category/cat8.png",
    },
    {
      cateImg: "./images/category/cat9.png",
    },
    {
      cateImg: "./images/category/cat10.png",
    },
    {
      cateImg: "./images/category/cat11.png",
    },
  ]

  return (

    showSidebarCategory ? <>
      <div className='category'>
        {categories.map((value, index) => {
          return (
            <Link to={`/product?categoryId=${value.id}`} key={index}>
              <div className='box f_flex' >
                <img src={data[index].cateImg} alt='' />
                <span>{value.name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </> : null

  )
}

export default Categories
