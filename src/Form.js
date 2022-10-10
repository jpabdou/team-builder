import React, { useState} from 'react';

export default function Form() {
    const [team, setTeam] = useState([])
  
    const [teamMember, setTeamMember] = useState({fname:"", lname:"", email: "", role:"", newHire:false})
    function onFormChange(evt) {
      setTeamMember({...teamMember, [evt.target.name]:evt.target.value})
    }
    function onFormCheck(evt) {
      setTeamMember({...teamMember, [evt.target.name]:evt.target.checked})
    }
    function onSubmit(evt) {
      evt.preventDefault();
      setTeam([...team, teamMember])
      setTeamMember({fname:"", lname:"", age: "", role:"", newHire:false})
    }
    return (
      <div className="App">
      <h1>The BloomTechian React Team</h1>
        <form onSubmit={onSubmit}>
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
            <input onChange={onFormCheck} value={teamMember.newHire} type="checkbox" name="newHire" />
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
            team.map((member,idx)=><h5 key={idx}>{member.fname+" "+member.lname}</h5>)
          }
      </div>
    );
  }
  