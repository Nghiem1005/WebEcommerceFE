import React, { useState } from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"
import { useAuth } from "../../utils/authProvider"
import { useEffect } from "react"
import { memo } from "react"

const Header = ({ CartItem, setShowSidebarCategory, showSidebarCategory }) => {
  const [user, setUser] = useState(null);
  const auth = useAuth();
  useEffect(() => {
    setUser(auth.user)
  }, [auth.user])
  return (
    <>
      <Head />
      {<Search CartItem={CartItem} user={user}/> }
      {<Navbar setShowSidebarCategory={setShowSidebarCategory} showSidebarCategory={showSidebarCategory} user={user} />}
    </>
  )
}

export default memo(Header)
