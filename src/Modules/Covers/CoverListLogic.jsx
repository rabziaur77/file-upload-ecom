import { useEffect, useState } from "react";
import APIService from "../Service/API_Service";

function CoverListLogic(){
    const[selecteCover, setSelecteCover]= useState(null);
    const[showCover, setShowCover]= useState(false);
    const[covers, setCover]=useState([]);
    
    useEffect(()=>{
        fetchCovers()
    },[])

    const fetchCovers = async ()=>{
        try {
            const response = await APIService.GetService("/api/MobileCovers/GetCoverList");
            console.log("API Response:", response);
            
            // Check the structure of the response
            if (response && response.response) {
                setCover(response.response);
            } else {
                console.warn("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Failed to fetch models:", error);
        }
    }

    const handleEdit=(model)=>{
        console.log(model)
        setShowCover(true);
        setSelecteCover(model)
    }

    const handleClose = () => {
        setShowCover(false);
        fetchCovers();
    };

    const handleDel=async (id)=>{
        console.log(id)
        const response = await APIService.deleteModel(`/api/MobileCovers/deleteCover/${id}`)

        if (response) {
            alert(response.message);
            fetchCovers();
        } else {
            console.warn("Unexpected response structure:", response);
        }
    }

    const handleToggleActive= async(id, isActive)=>{
        const response = await APIService.PatchService(`/api/MobileCovers/updateIsActive/${id}`,{ isActive: !isActive })
        if (response) {
            alert(response.message);
            fetchCovers();
        } else {
            console.warn("Unexpected response structure:", response);
        }
    }
    return {
        covers,
        handleEdit,
        handleDel,
        showCover,
        handleClose,
        selecteCover,
        handleToggleActive
    }
}

export default CoverListLogic;