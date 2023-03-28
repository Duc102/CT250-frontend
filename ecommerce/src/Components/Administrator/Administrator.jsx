import React, {useState, useEffect} from 'react'
import AdminSidebar from "./SidbarComponent/AdminSidebar"
import MainComponent from './MainComponent/MainComponent'

export default function Administrator() {
  const [mainClass, setMainClass] = useState("main");
  const [activeSidebar, setActiveSidebar]=useState("");
  return (
    <>
        <AdminSidebar setMainClass={setMainClass} activeSidebar={activeSidebar}/>
        <MainComponent mainClass={mainClass} setActbar = {setActiveSidebar}/>
    </>
  )
}
