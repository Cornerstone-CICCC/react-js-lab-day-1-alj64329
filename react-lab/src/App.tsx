import { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import type { User } from './types/user'
import UserList from './components/UserList'
import { v4 as uuidv4 } from 'uuid';
import UserProfile from './components/UserProfile'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [userToEdit, setUserToEdit] = useState<User|null>(null)
  const [userToView, setUserToView] = useState<User|null>(null)

  const handleDeleteUser =(id:string)=>{
    setUsers(prev=>prev.filter(user=>user.id===id))
  }

  const handleUpdateUser =(updateUser:User)=>{
    setUsers(prev=> prev.map(user=>user.id===updateUser.id?{...updateUser}:user))
    setUserToEdit(null)
  }
  
  const handleAddUser =(user:Omit<User,'id'>)=>{
    setUsers(prev =>
    [...prev,{
      ...user,
      id:uuidv4()
    }]
    )
  }

  const handleView =(user:User)=>{
    setUserToView(user)
  }

  const handleUpdareUserSet=(user:User)=>{
    setUserToEdit(user)
  }

  useEffect(()=>{

  }, [users])
  return (
    <div className='flex flex-col pt-8'>
      <div>
        <UserForm
        onAdd={handleAddUser}
        updateUser={userToEdit}
        onUpdate={handleUpdateUser}/>
      </div>

        <div className='pt-7'>
          <ul>
        {users.length>0&&
        users.map(user=>(
          <UserList key={user.id} user={user} onDelete={handleDeleteUser} onView={handleView} setUpdateUser={handleUpdareUserSet} />
        ))}
        </ul>
      </div>

      <div>
        {userToView&&
        <UserProfile user={userToView}/>}
      </div>
    </div>
  )
}

export default App
