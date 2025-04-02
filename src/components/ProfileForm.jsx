import { useState, useEffect } from "react";

export default function ProfileForm(props) {
    const {formData,setFormData}=props;
    const[profileData,setProfileData]=useState({
        name:FormData?.name||"",
        id:FormData?.id||"",
        position:FormData?.position||"",
        department:FormData?.department||"",
        birthdate:FormData?.birthdate||"",
        hiredate:FormData?.hiredate||"",
        status:FormData?.status||"",
        phone:FormData?.phone||"",
        address:FormData?.address||"",
        gender:FormData?.gender||""
    });

    useEffect(() => {
        setProfileData(formData);
    }, []);

    const handleChange=(e)=>{
        setProfileData({...profileData,[e.target.name]:[e.target.value]});
        setFormData({...formData,[e.target.name]:[e.target.value]});
        console.log(formData);
    }

    

    return (
        <fieldset>
            <legend>Profile Details</legend>
            <form>
                <div className="field-value">
                    <label className="field">ID</label>
                    <input
                        type="text"
                        className="value"
                        name="id"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Name</label>
                    <input
                        type="text"
                        className="value"
                        name="name"
                        onChange={(e)=>handleChange(e)}
                        value={formData.name||profileData.name||""}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Address</label>
                    <input
                        type="text"
                        className="value"
                        name="address"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Phone number</label>
                    <input
                        type="tel"
                        className="value"
                        name="phone"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Gender</label>
                    <select
                        className="value"
                        name="gender"
                        onClick={(e)=>handleChange(e)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="field-value">
                    <label className="field">Birthdate</label>
                    <input
                        type="date"
                        className="value"
                        name="birthdate"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Department</label>
                    <input
                        type="text"
                        className="value"
                        name="department"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Job Position</label>
                    <input
                        type="text"
                        className="value"
                        name="position"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Hire Date</label>
                    <input
                        type="date"
                        className="value"
                        name="hiredate"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">ID status</label>
                    <select
                        className="value"
                        name="status"
                        onClick={(e)=>handleChange(e)}
                    >
                        <option value="issued">Issued</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="banned">Banned</option>
                    </select>
                </div>
            </form>
        </fieldset>
    );
}
