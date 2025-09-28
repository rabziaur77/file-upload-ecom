import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showConfirm, hideConfirm } from "../../redux/confirmSlice";
import APIService from "../Service/API_Service";

function BackModelListLogic(){
    const[selecteModel, setSelecteModel]= useState(null);
    const[showModal, setShowModal]= useState(false);
    const[models, setModels]=useState([]);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        fetchModels()
    },[])

    const fetchModels = async ()=>{
        try {
            const response = await APIService.GetService("/api/MobileBackModels/GetModelList");
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
        dispatch(showConfirm({
        message: "Do you really want to delete this item?",
        onConfirm: async (password) => {
            const loginModel = JSON.parse(localStorage.getItem("session"));
            let model = {
                username: loginModel.username,
                password: password
            };
            console.log("Deleting:", model,id);

           await APIService.PostService('/api/UserAccount/loginUser', model)
            .then(async response => {
                if (response.message === "Login successful") {
                     const response = await APIService.deleteModel(`/api/MobileBackModels/deleteModel/${id}`)

                    if (response) {
                        alert(response.message);
                        dispatch(hideConfirm());
                        fetchModels();
                    } else {
                        console.warn("Unexpected response structure:", response);
                    }
                }
                else {
                    alert(response.status);
                }
            }).catch(ex => {
                console.log(ex)
            })
        },
        }));
    }
    const handleToggleActive= async(id, isActive)=>{
        const response = await APIService.PatchService(`/api/MobileBackModels/updateIsActive/${id}`,{ isActive: !isActive })
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
        selecteModel,
        handleToggleActive
    }
}

export default BackModelListLogic;