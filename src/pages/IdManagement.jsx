import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { useState,useEffect } from 'react'
import React from 'react'

import { getProfile,generateId,getTemplate,saveTemplate} from '../features/idCardSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Stage,Layer,Text,Image,Group} from 'react-konva'


export default function IdManagement(){
    const dispatch=useDispatch()
    const { idCards } = useSelector((state) => state.idCard);
    const [image, setImage] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
    const [isEditing,setIsEditing]=useState(false);
    const [isUpdating,setIsUpdating]=useState(false);
    const [userProfile,setUserProfile]=useState([]);
    const [extractData,setExtractData]=useState([]);
    const [id,setId]=useState();
    const [selectedTemplate,setSelectedTemplate]=useState("front");
    
    const [templates,setTemplates]=useState({
        front:{
            image:{
                xPosition:30,
                yPosition:80,
            },
            engName:{
                xPosition:30,
                yPosition:80,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Name',
                fieldName:'name'
            },
            role:{
                xPosition:30,
                yPosition:90,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Role',
                fieldName:'position'
            },
            issuedate:{
                xPosition:30,
                yPosition:100,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Issue Date',
                fieldName:'issuedate'
            },
            expiredate:{
                xPosition:30,
                yPosition:110,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Expire Date',
                fieldName:'expiredate'
            }
        },
        back:{
            phone:{
                xPosition:30,
                yPosition:90,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Phone',
                fieldName:'phone'
            },
            address:{
                xPosition:30,
                yPosition:100,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Address',
                fieldName:'address'
            }
        },
        badge:{
            image:{
                xPosition:30,
                yPosition:80,
            },
            engName:{
                xPosition:30,
                yPosition:80,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Name',
                fieldName:'name'
            },
            role:{
                xPosition:30,
                yPosition:90,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Role',
                fieldName:'position'
            },
        }
        
    })
    
    useEffect(()=>{
        if(userProfile&&userProfile.image){
            const img=new window.Image()
            img.src=userProfile.image
            img.onload=()=>setImage(img)
        }
        else{
            const fallback=new window.Image()
            fallback.src="https://th.bing.com/th/id/OIP.30Yq02E10j8tn6kKBO1qdQHaHa?rs=1&pid=ImgDetMain"
            fallback.onload=()=>setImage(fallback)
        }
    },[userProfile])

    useEffect(()=>{
        
        const querySearchParams=new URLSearchParams(window.location.search);
        const dataString=querySearchParams.get("data");

        if(dataString){
            const parseId=JSON.parse(decodeURIComponent(dataString));
            setId(parseId)
        }

    },[]);

    useEffect(()=>{
       if(id){
        dispatch(getProfile({Id:id})).then((data)=>{
            const dataitem=data.payload;
            console.log(dataitem);
            if(dataitem){
                setUserProfile(dataitem);
            }
            else{
                console.log('no id found');
                setUserProfile(null);
            }
            
        })
    }
    },[dispatch,id,idCards])

    useEffect(() => {
        dispatch(getTemplate()).then((data)=>{
            const dataitem=data.payload
            console.log(dataitem)
            setTemplates(dataitem)
        });
      }, []);

    const selectedTemplateFields = templates[selectedTemplate] || {};

    const handleIdChange=(e)=>{
        setExtractData({...extractData,[e.target.name]:e.target.value})
        console.log(extractData);
    }

    const handleCreateId=()=>{
        dispatch(generateId({Id:id,UserInfo:userProfile,FormData:extractData}));
        
    }

    const styles = {
        front: { },
        back: { },
        badge: { },
      };

    const handleTemplateChange = (e, fieldKey) => {
        const { name, value } = e.target;
        setTemplates(prevTemplates => {
            const selectedTemplateCopy = { ...prevTemplates[selectedTemplate] };
            if (selectedTemplateCopy[fieldKey]) {
                selectedTemplateCopy[fieldKey] = { ...selectedTemplateCopy[fieldKey], [name]: value };
            } else {
                console.warn(`Field ${fieldKey} not found in template ${selectedTemplate}`);
            }
            return { ...prevTemplates, [selectedTemplate]: selectedTemplateCopy };
        });
    };

    const handlePositionChange = (e) => {
        const { name, value } = e.target;
        setImagePosition((prevPosition) => ({
            ...prevPosition,
            [name]: parseInt(value, 10), 
        }));
        setTemplates((prevTemplates) => ({
            ...prevTemplates,
            [selectedTemplate]: {
                ...prevTemplates[selectedTemplate],
                imagePosition: {
                    ...(prevTemplates[selectedTemplate]?.imagePosition || { x: 50, y: 50 }), 
                    [name]: parseInt(value, 10),
                },
            },
        }));
        
    };
      
   
    const handleSaveTemplate=(templates)=>{
        dispatch(saveTemplate({TemplateData:templates}));
    }

    return(
        <div className='page'>
            <Navbar/>
            <div id='content'>
                <Sidebar/>
                <main>
                    <Header/>
                        <select className='select-pag' value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                                <option value="front">Front</option>
                                <option value="back">Back</option>
                                <option value="badge">Badge</option>
                        </select>
                        <div className='id-temp'>
                        {selectedTemplateFields && Object.entries(selectedTemplateFields).length > 0 && (
                        <Stage className="stage" width={755} height={600}>
                            <Layer>
                            {image && (
                                <Image
                                x={templates[selectedTemplate]?.imagePosition?.x || 50}  
                                y={templates[selectedTemplate]?.imagePosition?.y || 50}
                                    image={image} 
                                    width={150} 
                                    height={150} 
                                    rotation={0} 
                                />
                            )}
                            {Object.entries(selectedTemplateFields).map(([key, field]) => {
                                const fieldName = field.fieldName;
                                const fieldValue = userProfile ? userProfile[fieldName] : null;
                                const displayText = Array.isArray(fieldValue)
                                    ? fieldValue[0]
                                    : (fieldValue || "N/A");

                                const xPos = field.xPosition ? Number(field.xPosition) : 0;
                                const yPos = field.yPosition ? Number(field.yPosition) : 0;
                                return (
                                    <Group key={key}>
                                        <Text
                                            x={xPos}
                                            y={yPos}
                                            text={field.label}
                                            fill={field.fontColor}
                                            fontFamily={field.fontStyle}
                                            fontSize={Number(field.fontSize)}
                                            fontStyle="bold"
                                        />
                                        <Text
                                            x={xPos + 200}
                                            y={yPos}
                                            text={displayText}
                                            fill={field.fontColor}
                                            fontFamily={field.fontStyle}
                                            fontSize={Number(field.fontSize)}
                                        />
                                    </Group>
                                    );
                                })}
                            </Layer>
                        </Stage>
                        )}
                        <div className='settings'>
                            <div id='toggle'>
                                <div onClick={()=>setIsEditing(true)} className={isEditing?'toggle-on':''}>Edit Template</div>
                                <div onClick={()=>setIsEditing(false)} className={isEditing?'':'toggle-on'}>Preview </div>
                            </div>
                            {isEditing?
                                (   <div>
                                        <div className="template-edit">
                                        <Group className="position-controls">
                                            <Group>
                                                <label>X Position Image:</label>
                                                <input
                                                    type="number"
                                                    name="x"
                                                    onChange={handlePositionChange} 
                                                    disabled={!isUpdating}
                                                    placeholder='x-axis'
                                                />
                                            </Group>
                                            <Group>
                                                <label>Y Position Image:</label>
                                                <input
                                                    type="number"
                                                    name="y"
                                                    onChange={handlePositionChange} 
                                                    disabled={!isUpdating}
                                                    placeholder='y-axis'
                                                />
                                            </Group>
                                        </Group>
                                    <div className="tempSettings">
                                    {Object.entries(templates[selectedTemplate]).map(([key, field]) => (
                                    <div key={key}>
                                        <h3>{field.label}</h3>
                                        <input
                                            type="number"
                                            name="xPosition"
                                            placeholder='x position'
                                            onChange={(e) => handleTemplateChange(e, key)}  // Passing `key` as the fieldKey
                                            disabled={!isUpdating}
                                        />
                                        <input
                                            type="number"
                                            name="yPosition"
                                            placeholder='y position'
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            disabled={!isUpdating}
                                        />
                                        <input
                                            type="number"
                                            name="fontSize"
                                            placeholder='font size'
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            disabled={!isUpdating}
                                        />
                                        <input
                                            type="color"
                                            name="fontColor"
                                        
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            disabled={!isUpdating}
                                        />
                                        <select
                                            name="fontStyle"
                                            
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            disabled={!isUpdating}
                                        >
                                            <option value="arial">Arial</option>
                                            <option value="calibri">Calibri</option>
                                            <option value="gothic">Gothic</option>
                                        </select>
                                    </div>
                                ))}
                            </div>      
                        </div>
                        <button onClick={isUpdating?()=>{setIsUpdating(false);handleSaveTemplate(templates)}:()=>setIsUpdating(true)}>{isUpdating?"Save":"Update"}</button>
                            </div>  
                    ):
                    (
                        <div>
                            <div className="field-value">
                                <label className="field">Issue Date</label>
                                <input className="value" type="date" name="issuedate" 
                                onChange={(e)=>handleIdChange(e)}></input>
                            </div>
                            <div className="field-value">
                                <label className="field">Expiry Date</label>
                                <input className="value" type="date" name="expiredate"
                                onChange={(e)=>handleIdChange(e)} ></input>
                            </div>
                            <button onClick={handleCreateId}>Generate ID</button>
                        </div>
                    )}
                            </div>
                        </div>
                    <Footer/>
                </main>
            </div>
        </div>
    )
}