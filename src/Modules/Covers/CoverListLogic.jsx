import { useEffect, useState } from "react";
import APIService from "../Service/API_Service";
import { showConfirm, hideConfirm } from "../../redux/confirmSlice";
import { useDispatch } from "react-redux";

function CoverListLogic(){
    const[selecteCover, setSelecteCover]= useState(null);
    const[showCover, setShowCover]= useState(false);
    const[covers, setCover]=useState([]);
    const dispatch = useDispatch();

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
                     const response = await APIService.deleteModel(`/api/MobileCovers/deleteCover/${id}`)

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