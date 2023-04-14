import React from 'react'

const Newsitem = ({ title, description, imageUrl, date }) => {
    return (
        <div className="my-3 ms-4 " style={{width:'300px'}} >
            <div className="card rounded-4">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}  </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">On {new Date(date).toGMTString()}</small></p>
                </div>
            </div>
        </div>
    )
}

export default Newsitem
