import { useEffect, useState } from "react";
import APIService from "../Service/API_Service";

function ModelListLogic(){
    const[selecteModel, setSelecteModel]= useState(null);
    const[showModal, setShowModal]= useState(false);
    const[models, setModels]=useState([]);
    
    useEffect(()=>{
        fetchModels()
    },[])

    const fetchModels = async ()=>{
        try {
            const response = await APIService.GetService("/api/MobileModels/GetModelList");
            console.log("API Response:", response);
            
            // Check the structure of the response
            if (response && response.response) {
                setModels(response.response);
            } else {
                console.warn("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Failed to fetch models:", error);
        }
    }

    const handleEdit=(model)=>{
        console.log(model)
        setShowModal(true);
        setSelecteModel(model)
    }

    const handleClose = () => {
        setShowModal(false);
        fetchModels();
    };

    const handleDel=async (id)=>{
        console.log(id)
        const response = await APIService.deleteModel(`/api/MobileModels/deleteModel/${id}`)

        if (response) {
            alert(response.message);
            fetchModels();
        } else {
            console.warn("Unexpected response structure:", response);
        }
    }
    return {
        models,
        handleEdit,
        handleDel,
        showModal,
        handleClose,
        selecteModel
    }
}

export default ModelListLogic;