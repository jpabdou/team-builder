import React, { useEffect, useState} from 'react';

export default function Form() {
    const [team, setTeam] = useState([])
    const [teamMember, setTeamMember] = useState({fname:"", lname:"", email: "", role:"", newHire:false})
    const [editing, setEditing] = useState({})
    const [inEditing, setInEditing] = useState(null)

    function onFormChange(evt) {
      setTeamMember({...teamMember, [evt.target.name]:evt.target.value})
    }
    function onFormCheck(evt) {
      setTeamMember({...teamMember, [evt.target.name]:evt.target.checked})
    }

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
      setEditing({})
      setInEditing(null)
    }

    function editor(member,index) {
      setEditing({...member})
      setInEditing(index)

    }

    useEffect(()=>{setTeamMember(editing)},[editing])

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
              <option />
              <option>Team Manager</option>
              <option>Individual Contributor</option>
              <option>Apprentice/Entry Level</option>
            </select>
          </label>
          <br></br>
          <label>
            New Hire? (less than 6 months in role):
            <input onChange={onFormCheck} checked={teamMember.newHire} type="checkbox" name="newHire" />
          </label><br></br>
          <button>Submit Team Member</button>
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
  