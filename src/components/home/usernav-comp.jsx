import React from 'react'
import { Link } from 'react-router-dom';
import userBoxData from '../../data/userboxData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const UserNavComp = () => {


  return (
    <div className='user-box'>
        <ul>
            {
                userBoxData.map((item,idx) => {
                    return(
                        <li className= {item.class} key={idx}>
                            <FontAwesomeIcon icon={item.icon}/>
                            <Link to = {item.linkTo}>{item.title}</Link>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default UserNavComp;
