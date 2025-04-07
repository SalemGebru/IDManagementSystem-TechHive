import { useState,useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Stage,Layer,Text,Image,Group,Image as KonvaImage } from "react-konva";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faPen,faTrash } from "@fortawesome/free-solid-svg-icons";


import { saveTemplate,getTemplate} from "../features/idCardSlice";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TemplateSettings(){
    const dispatch=useDispatch();
    const [image, setImage] = useState(null);
    const backImg=new window.Image();
    backImg.src='https://th.bing.com/th/id/OIP.Rv8GJCOZZhXXpr-MEfSOugAAAA?rs=1&pid=ImgDetMain'
    
    const [templates,setTemplates]=useState({
            front:{
                templateBackground:{
                    width:755,
                    height:600,
                    image:null
                },
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
                templateBackground:{
                    width:755,
                    height:600,
                    image:null
                },
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
                templateBackground:{
                    width:755,
                    height:600,
                    image:null
                },
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
            
        });
    const [isEditModalOpen,setIsEditModalOpen]=useState(false);
    const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
    const [isEditingDetails,setIsEditingDetails]=useState(false);
    const [isUpdating,setIsUpdating]=useState(false);
    const [selectedTemplate,setSelectedTemplate]=useState("front");
   
    useEffect(()=>{
        const img=new window.Image();
        img.src="https://th.bing.com/th/id/OIP.30Yq02E10j8tn6kKBO1qdQHaHa?rs=1&pid=ImgDetMain";
        img.onload=()=>setImage(img);
        
        
    },[]);

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
    
        const selectedTemplateFields = templates[selectedTemplate] || {};
    
        const handleTemplateImageUpload=(e,tempType)=>{
            console.log('clicked');
            const file=e.target.files[0];

            if(file){
                const reader=new FileReader();
                reader.onloadend=()=>{
                    
                    const img=reader.result;
                    
                       localStorage.setItem(`templateCards${selectedTemplate}`,img);
                       const chcek=localStorage.getItem(`templateCards${selectedTemplate}`)
                       console.log(chcek)
                       setTemplates(prevTemplates => {
                        const updatedTemplate = { ...prevTemplates[selectedTemplate] };
                        updatedTemplate.templateBackground = {
                          ...updatedTemplate.templateBackground,
                          image: ``,
                        };
                        console.log(updatedTemplate)
                        return {
                          ...prevTemplates,
                          [selectedTemplate]: updatedTemplate,
                        };
                      });
                      
                    
                    
                };
                reader.readAsDataURL(file)
            }
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
            console.log('saved');
            dispatch(saveTemplate({TemplateData:templates}));
        }
    return(
        <div className="page">
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
                        <div className="template">
                            {selectedTemplateFields && Object.entries(selectedTemplateFields).length > 0 && (
                                <Stage className="stage" width={755} height={600}>
                                    <Layer>
                                        <KonvaImage
                                           image={backObj|| backImg}
                                            width={755}
                                            height={600}
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
                                            const fieldValue = "userProfile ? null";
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
                                  <div className="settings">
                                    <div id='toggle'>
                                        <div onClick={()=>setIsEditingDetails(false)} className={!isEditingDetails?'toggle-on':''}>Template Form</div>
                                        <div onClick={()=>setIsEditingDetails(true)} className={isEditingDetails?'toggle-on':''}>Edit Template Details </div>
                                    </div>
                                    {isEditingDetails?(
                                        <div>
                                        <div className="template-edit">
                                        <Group className="position-controls">
                                            
                                            <Group>
                                                <label>Image <button onClick={()=>setIsEditModalOpen(true)}><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></button></label>

                                                <div className={isEditModalOpen?"modal":"hide"}>
                                                    <div className="overlay"></div>
                                                    <div className="modal-content">
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
                                                        <div className="btn-grp">
                                                            <button onClick={()=>setIsEditModalOpen(false)}>Back</button>
                                                        </div>
                                                    </div>
                                                </div>
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
                                            onChange={(e) => handleTemplateChange(e, key)}  
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
                                    ):(
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>Template Type</td>
                                                    <td>File</td>
                                                    <td>Actions</td>
                                                </tr>
                                                
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Front Template</td>
                                                    <td><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></td>
                                                    <td>
                                                        <label htmlFor="template-front">
                                                        <FontAwesomeIcon icon={faPen} style={{cursor:'pointer'}} /><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleTemplateImageUpload(e, selectedTemplate)}
                                                            style={{ display: 'none' }}
                                                            id="template-front"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Back Template</td>
                                                    <td><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></td>
                                                    <td>
                                                    <label htmlFor="template-back">
                                                        <FontAwesomeIcon icon={faPen} style={{cursor:'pointer'}} /><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleTemplateImageUpload(e, selectedTemplate)}
                                                            style={{ display: 'none' }}
                                                            id="template-back"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Badge Template</td>
                                                    <td><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></td>
                                                    <td>
                                                    <label htmlFor="template-badge">
                                                        <FontAwesomeIcon icon={faPen} style={{cursor:'pointer'}} /><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleTemplateImageUpload(e, selectedTemplate)}
                                                            style={{ display: 'none' }}
                                                            id="template-badge"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                    <button  onClick={()=>handleSaveTemplate(templates)}>Save Template</button>
                                  </div>  
                                
                                            
                        </div>
                    <Footer/>
                </main>
            </div>
        </div>
    )
}