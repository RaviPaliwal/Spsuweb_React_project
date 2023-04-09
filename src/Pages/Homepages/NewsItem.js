import React from 'react'

const Newsitem = ({ title, description, imageUrl, date }) => {
    return (
        <div className="my-3" style={{width:'400px'}} >
            <div className="card">
                <img src={!imageUrl ?"https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg": imageUrl} className="card-img-top" alt="..." />
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
