import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { useState,useEffect } from 'react'
import React from 'react'
import jsPDF from 'jspdf'

import { getProfile,generateId,getTemplate} from '../features/idCardSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Stage,Layer,Text,Image,Group,Image as KonvaImage} from 'react-konva'


export default function IdManagement(){
    const dispatch=useDispatch()
    const { idCards } = useSelector((state) => state.idCard);
    const [image, setImage] = useState(null);
    const [isCreateModalOpen,setIsCreateModalOpen]=useState(false);
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
                xPosition:400,
                yPosition:80,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Name',
                fieldName:'name'
            },
            role:{
                xPosition:400,
                yPosition:100,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Role',
                fieldName:'position'
            },
            issuedate:{
                xPosition:400,
                yPosition:120,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Issue Date',
                fieldName:'issuedate'
            },
            expiredate:{
                xPosition:400,
                yPosition:140,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Expire Date',
                fieldName:'expiredate'
            }
        },
        back:{
            phone:{
                xPosition:400,
                yPosition:90,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Phone',
                fieldName:'phone'
            },
            address:{
                xPosition:400,
                yPosition:120,
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
                xPosition:400,
                yPosition:90,
                fontSize:18,
                fontColor:'black',
                fontStyle:'arial',
                label:'Name',
                fieldName:'name'
            },
            role:{
                xPosition:400,
                yPosition:120,
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
            if(dataitem=='Assignment to constant variable.'){
                
                console.log(templates);
            }
            else{
                setTemplates(dataitem);
                console.log(templates)
            }
            
            
        });
      }, []);

    const handleDownload=()=>{
        if(id){
            dispatch(getProfile({Id:id})).then((data)=>{
                const dataitem=data.payload;
                console.log(dataitem);
                if(dataitem){
                    const idFile=dataitem;
               const doc=new jsPDF();
               if(idFile){
                //to be handled

               }
               else{
                doc.text('No template found',10,10);
               }
                }})}
        
    }

    const selectedTemplateFields = templates[selectedTemplate] || {};

    const handleIdChange=(e)=>{
        setExtractData({...extractData,[e.target.name]:e.target.value})
        console.log(extractData);
    }

    const handleCreateId=()=>{

        dispatch(generateId({Id:id,UserInfo:userProfile,FormData:extractData}));
        handleDownload();
        
    }

    const [backObj,setBackObj]=useState();

    useEffect(()=>{
        const img=localStorage.getItem(`templateCards${selectedTemplate}`);
        console.log(img);
        const loading=new window.Image();
        loading.src=img;
        console.log(loading);
        setBackObj(loading);
    },[selectedTemplate])
    

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
                        <button onClick={()=>setIsCreateModalOpen(true)}>Generate ID</button>
                        <div className={isCreateModalOpen?"modal":'hide'}>
                            <div className="overlay"></div>
                            <div className="modal-content id-modal">
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
                           
                        </div>
                            <div className='btn-grp'>
                                <button onClick={()=>setIsCreateModalOpen(false)}>Back</button>
                                <button onClick={handleCreateId}>Create ID</button>
                            </div>
                            </div>
                        </div>
                        <div className='id-temp'>
                        {selectedTemplateFields && Object.entries(selectedTemplateFields).length > 0 && (
                        <Stage className="stage" width={755} height={600}>
                            <Layer>
                                <KonvaImage
                                    width={755}
                                    height={600}
                                    image={backObj}
                                />
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
                        </div>
                    <Footer/>
                </main>
            </div>
        </div>
    )
}