import React, { use, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { User } from '../types/user'

type Props = {
  onAdd:(user:Omit<User,'id'>)=>void,
  updateUser:User| null,
  onUpdate: (user:User)=> void
}

const UserForm = ({onAdd, updateUser, onUpdate}: Props) => {
const [formData, setFormData] = useState<Omit<User,'id'>>({
    fullname: "",
    age: 0,
    education: "",
    gender: "",
    skills: [],
    bio: ""
  })

  useEffect(()=>{
    if(updateUser){
      setFormData({
        fullname: updateUser.fullname,
        age: updateUser.age,
        education: updateUser.education,
        gender: updateUser.gender,
        skills: updateUser.skills,
        bio: updateUser.bio
      })
    }
  },[updateUser])

  const handleChange =(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const {name, type, value} = e.target
    if(type === "checkbox"){
      setFormData((prev)=>({
        ...prev,
        skills:!prev.skills.includes(value)? [...prev.skills,value]
        :prev.skills.filter((skill)=>skill!== value)
      }))
    }else{
      setFormData(prev=>({
        ...prev,
        [name]:value
      }))
    }
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(updateUser){
      const updates ={
        id:updateUser.id,
        ...formData
      }
      onUpdate(updates)
    }else{
    onAdd(formData)
    }
    onReset()
  }


  const onReset =()=>{
    setFormData({
    fullname: "",
    age: 0,
    education: "",
    gender: "",
    skills: [],
    bio: ""
  })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name='fullname'
          onChange={handleChange}
          value={formData.fullname}
           />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name='age'
          onChange={handleChange}
          value={formData.age}
           />
        </div>
        <div>
          <select name="education" value={formData.education} onChange={handleChange}>
            <option value="">Select Education</option>
            <option value="high-school">High School</option>
            <option value="college">College</option>
            <option value="grade-school">Grade School</option>
          </select>
        </div>

        <div>
          <div>Gender:</div>
            <div>
              <input type="radio" name="gender" value="female"
              onChange={handleChange} />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input type="radio" name="gender" value="male"
              onChange={handleChange}/>
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="other"
              onChange={handleChange}/>
              <label htmlFor="other">Other</label>
            </div>
        </div>


        <div>
          <label>
            Skills:
            <div>
            <input type="checkbox" name='TypeScript' value='TypeScript'
            checked={formData.skills.includes('TypeScript')} onChange={handleChange}/>
            <label>TypeScript</label>
            </div>

            <div>
            <input type="checkbox" name='React' value='React'
            checked={formData.skills.includes('React')} onChange={handleChange}
            />
            <label>React</label>
            </div>

            <div>
                <input type="checkbox" name='Node' value='Node'
              checked={formData.skills.includes('Node')} onChange={handleChange}/>
              <label>Node</label>
            </div>
            <div>
                <input type="checkbox" name='NoSQL' value='NoSQL'
            checked={formData.skills.includes('NoSQL')} onChange={handleChange}/>
            <label>NoSQL</label>        
            </div>

          </label>
        </div>

        <div>
          <input type="textarea" name='bio' placeholder='About me...' />
        </div>

        <button
        type= "submit"
        className='border me-4'>Add</button>
        <button
        onClick={onReset}
        className='border'
        >Clear</button>
      </form>
    </div>
  )
}

export default UserForm