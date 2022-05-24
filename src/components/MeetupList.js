import React from "react"
import { useSelector } from "react-redux"

 const MeetupList = (props) =>{

// const meeting= useSelector((state)=>state)

// const renderlist=meeting.map((meeting)=>{
// const {title,desc}=meeting

// return(
//     <>
//     <h3>{title}</h3>
//     <p> {desc} </p>
//     </> 

// )
 

// })

return (
<>
<h3>{props.title}</h3>
   <p> {props.description} </p>
   </>
)
}
export default MeetupList