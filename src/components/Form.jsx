

export default function Form(props){
    const {formData,setFormData,setConfPassword,selectedUserName,selectedUserEmail,
    selectedUserRole,selectedUserPassword} =props;
 
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:[e.target.value]});
    }
    return(
        <fieldset>
            <legend>User Details</legend>
                <form>
                    <div className="field-value">
                        <label className="field">Username</label>
                        <input type="text"
                        className="value" 
                        name="username"
                        onChange={(e)=>handleChange(e)}
                        required
                        placeholder={selectedUserName||""}></input>
                    </div>
                    <br/>
                    <div className="field-value">
                        <label className="field">Email</label>
                        <input type="email" 
                        className="value" 
                        name="email" 
                        onChange={(e)=>handleChange(e)} 
                        required 
                        placeholder={selectedUserEmail||""}></input>
                    </div>
                    <br/>
                    <div className="field-value">
                        <label className="field">Role</label>
                        <select name="role" onClick={(e)=>handleChange(e)} placeholder={selectedUserRole||""}>
                            <option value="HR">HR</option>
                            <option value="Employee">Employee</option>
                            <option value="IT Assistant">IT Assistant</option>
                        </select>
                    </div>
                    <br/>
                    <div className="field-value" >
                        <label className="field">Password</label>
                        <input type="password"
                        className="value" 
                        name="password" 
                        onChange={(e)=>handleChange(e)} 
                        required
                        placeholder={selectedUserPassword||""} ></input>
                    </div>
                    <br/>
                    <div className="field-value">
                        <label className="field">Confirm Password</label>
                        <input type="password"
                        name="confPassword" 
                        className="value" 
                        onChange={(e)=>setConfPassword(e.target.value)}
                        required placeholder={selectedUserPassword||""}></input>
                    </div>
                </form>
                    
        </fieldset>
    )
}