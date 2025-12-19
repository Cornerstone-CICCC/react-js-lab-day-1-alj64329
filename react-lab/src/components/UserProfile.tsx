import React from 'react'
import type { User } from '../types/user'

type Props = {
    user:User
}

const UserProfile = ({user}: Props) => {
  return (
    <div className='p-4 border'>
        <div>
            <div>Name:</div>
            <div>{user.fullname}</div>
        </div>
        <div>
            <div>Age:</div>
            <div>{user.age}</div>
        </div>
        <div>
            <div>Education:</div>
            <div>{user.education}</div>
        </div>
        <div>
            <div>Gender:</div>
            <div>{user.gender}</div>
        </div>
        <div>
            <div>Skills:</div>
            <div>{user.skills.join(", ")}</div>
        </div>
        <div>
            <div>Bio:</div>
            <div>{user.bio}</div>
        </div>
        
    </div>
  )
}

export default UserProfile