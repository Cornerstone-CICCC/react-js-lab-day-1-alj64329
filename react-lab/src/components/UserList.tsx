import React from 'react'
import type { User } from '../types/user'

type Props = {
  user: User,
  setUpdateUser:(user:User)=>void
  onDelete:(id:string)=>void,
  onView:(user:User)=>void
}

const UserList = ({user, onDelete,setUpdateUser, onView}: Props) => {
  return (
    <li>
      {user.id} {user.fullname}
      <button
      className='border'
      onClick={()=>{setUpdateUser(user)}}>Update</button>
      <button
      className='border'
      onClick={()=>{onView(user)}}>View</button>
      <button
      className='border'
      onClick={()=>{onDelete(user.id)}}>Delete</button>
    </li>
  )
}

export default UserList