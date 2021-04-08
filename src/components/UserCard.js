import React from 'react'
import "../userCard.css"

let userCard=(props)=>{
    
    return(
    <div>
        <div className="card card-edit">
        <img src={props.user.avatar_url} className="card-img-top" alt="..."></img>
        <div className="card-body">
            <h5 className="card-title">{props.user.name}</h5>
            <p className="card-text">{props.user.company}</p>
            <small>{props.user.bio}</small>
        </div>
        </div>
    </div>
    );
}

export default userCard;