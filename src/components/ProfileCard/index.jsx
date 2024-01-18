import React from 'react';
import './style.scss';

function ProfileCard(props) {
  return (
    <a href={props.section} className={`card ${props.className}`}>
      <img src={`${props.image}`} alt={props.alt} className="card__avatar" />
      <h2 className="card__name">{props.name}</h2>
      <p className="card__role">{props.role}</p>
     
      <button className="card__follow-button">{props.buttonText}</button>
    </a>
  );
}
export default ProfileCard;
