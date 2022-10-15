import React, { useEffect, useState} from 'react';
import * as yup from "yup"

export default function Form() {
    const [team, setTeam] = useState([])
    const [teamMember, setTeamMember] = useState({fname:"", lname:"", email: "", role:"", newHire:false})
    const [inEditing, setInEditing] = useState(NaN)
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState({
      fname: "",
      lname: "",
      role: "",
      email:"",
      newHire:""
    });

    function setFormErrors(name, value){
      yup.reach(formSchema, name).validate(value)
      .then(()=>setErrors({...errors,[name]: ""}))
      .catch(err=> setErrors({...errors, [name]:err.errors[0]}))
    }

    function onFormChange(evt) {
      const { value, name} = evt.target
      setTeamMember({...teamMember, [evt.target.name]:evt.target.value})
      setFormErrors(name, value)
    }
    function onFormCheck(evt) {
      const { checked, name} = evt.target

      setTeamMember({...teamMember, [evt.target.name]:evt.target.checked})
      setFormErrors(name,checked)
    }
    const formSchema = yup.object().shape({
      fname: yup.string().required("First name required"),
      lname: yup.string().required("Last name required"),
      role: yup.string().oneOf(["Team Manager", "Individual Contributor", "Apprentice/Entry Level"], "Role required"),
      email: yup.string().email(),
      newHire: yup.boolean()
    })

    useEffect(()=>{
      formSchema.isValid(teamMember).then(valid=>setDisabled(!valid))
    },[teamMember])

    function submitMember(evt) {
      evt.preventDefault();
      setTeam([...team, teamMember])
      setTeamMember({fname:"", lname:"", email:"",role:"", newHire:false})
    }

    function editMember(evt) {
      evt.preventDefault();
      team.splice(inEditing,1,teamMember)
      setTeam([...team])
      setTeamMember({fname:"", lname:"", email:"",role:"", newHire:false})
      setInEditing(NaN)
    }

    function editor(member,index) {
      setTeamMember({...member})
      setInEditing(index)

    }

    return (
      <div className="App">
      <h1>The BloomTechian React Team</h1>
        <form onSubmit={isNaN(inEditing) ? submitMember : editMember}>
          <label>
            First Name:<br></br>
            <input onChange={onFormChange} value={teamMember.fname} name="fname" type="text" />
          </label>
          <br></br>
          <label>
            Last Name:<br></br>
            <input onChange={onFormChange} value={teamMember.lname} name="lname" type="text" />
          </label>
          <br></br>
          <label>
            Email:<br></br>
            <input onChange={onFormChange} value={teamMember.email} name="email" type="email" />
          </label>
          <br></br>
          <label>
            Role:<br></br>
            <select onChange={onFormChange} value={teamMember.role} name="role">
              <option value=""></option>
              <option value="Team Manager">Team Manager</option>
              <option value= "Individual Contributor">Individual Contributor</option>
              <option value="Apprentice/Entry Level">Apprentice/Entry Level</option>
            </select>
          </label>
          <br></br>
          <label>
            New Hire? (less than 6 months in role):
            <input onChange={onFormCheck} checked={teamMember.newHire} type="checkbox" name="newHire" />
          </label><br></br>
          <h6>{errors.fname} {errors.lname} {errors.role} {errors.email} {errors.newHire}</h6>
          <button disabled={disabled}>Submit Team Member</button>
        </form>
        <h3>Currently inputted member: <br></br>  
        First Name: {teamMember.fname}<br></br>  
        Last Name: {teamMember.lname}<br></br> 
        Email: {teamMember.email}<br></br>  
        Role: {teamMember.role} <br></br>  
        New Hire Status: {String(teamMember.newHire)}</h3>
        <h4>
          Current team members:</h4> {
            team.map((member,idx)=>{return(<div key={idx}>
              <h5>{member.fname+" "+member.lname}</h5>
              <button onClick={()=>editor(member,idx)}>Edit {member.fname}'s Entry</button>
              </div>)
          })
          }
      </div>
    );
  }
  