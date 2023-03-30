import React from 'react'
const AnnouncementItem = (props) => {
  return (
    <>
    <div className="d-flex row justify-content-center mt-1">
    <div className="row w-50">
        <div className=" ps-2 zoom col p-0 m-1" style={{"borderLeft":"2px solid #1abc9c","height":"auto"}}>
          <h6 style={{"color":"#1abc9c"}}><b>{props.title}</b></h6>
          <p style={{"fontSize":"0.89rem"}} >{props.info}</p>
        </div>
        <hr />
    </div>
</div>
  </>)
}

export default AnnouncementItem
