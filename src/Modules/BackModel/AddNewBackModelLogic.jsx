import { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showPopup, hidePopup } from "../../redux/popupslice";
import APIService from "../Service/API_Service";

function AddNewBackModelLogic(initialData = null) {
    const dispatch = useDispatch();
    const[boxList,setBoxList]=useState([]);
    const[coverList,setCoverList]=useState([]);
    const [formData, setFormData] = useState({
        boxNo: "",
        selectStyle: "Plain",
        selectSize: "Small",
        companyName: "",
        address: "",
        pincode: "",
        coverName: "",
        watermarks: [],
    });

    useEffect(() => {
        fetchModels();
        fetchCovers();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                modelName: initialData.modelName || "",
                skuModelName: initialData.skuModelName || "",
                boxNo: initialData.boxNumber || "",
                softwareVersion: initialData.softwareVersion || "",
                selectStyle: initialData.plainOrCurve || "Plain",
                selectSize: initialData.size || "Small",
                companyName: initialData.companyName || "",
                address: initialData.address || "",
                pincode: initialData.pincode || "",
                watermarks: [
                    initialData.watermark1,
                    initialData.watermark2,
                    initialData.watermark3,
                    initialData.watermark4,
                    initialData.watermark5,
                    initialData.watermark6
                ],
            });
        }
    }, [initialData]);


    const fetchModels = async ()=>{
        try {
            const response = await APIService.GetService("/api/MobileModels/GetModelList");
            if (response && response.response) {
                setBoxList(response.response);
            } else {
                console.warn("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Failed to fetch models:", error);
        }
    }

    const fetchCovers = async ()=>{
        try {
            const response = await APIService.GetService("/api/MobileCovers/GetCoverList");
            if (response && response.response) {
                setCoverList(response.response);
            } else {
                console.warn("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Failed to fetch models:", error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e, index) => {
        const files = [...formData.watermarks];
        files[index] = e.target.files[0];
        setFormData({ ...formData, watermarks: files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(initialData)
        dispatch(showPopup("Please, Wait..."))

        const requestData = bindData();
        var URL = "";
        if (initialData === null) {
            URL = "/api/MobileBackModels/AddModel";
        }
        else{
            URL = "/api/MobileBackModels/UpdateModel";
        }
        APIService.PostFormService(URL, requestData)
            .then((rep) => {
                let message = rep.message != undefined?rep.message: rep;
                dispatch(showPopup(message))
                setTimeout(() => {
                    dispatch(hidePopup())
                }, 1500)
            }).catch(ex => {
                dispatch(showPopup("Something went wrong, please contact to support."))
                setTimeout(() => {
                    dispatch(hidePopup())
                }, 1000)
            })

    };

    const bindData = () => {
        const requestData = new FormData();
        
        //requestData.append('PlainOrCurve', formData.selectStyle);
        //requestData.append('Size', formData.selectSize);
        requestData.append('CoverName', formData.coverName);
        requestData.append('BoxNumber', formData.boxNo);
        requestData.append('CompanyName', formData.companyName);
        requestData.append('Address', formData.address);
        requestData.append('Pincode', formData.pincode);
        requestData.append('Watermark4', boxList.find(b=>b.boxNumber===formData.boxNo)?.watermark4 || "");

        // Append MobileModelRequest properties
        if (initialData === null) {
            // Get files using IDs
            for (let i = 1; i <= 3; i++) {
                const fileInput = document.getElementById(`Watermark${i}`);
                if (fileInput?.files?.[0]) {
                    requestData.append('watermarks', fileInput.files[0]);
                    requestData.append(`watermarkIds`, i);
                }
            }
        }
        else {
            requestData.append('ModelID', initialData.modelID);

            for (let i = 1; i <= 6; i++) {
                const fileInput = document.getElementById(`Watermark${i}`);
                if (fileInput?.files?.[0]) {
                    requestData.append('watermarks', fileInput.files[0]);
                    requestData.append(`watermarkIds`, i);
                }
            }
        }
        return requestData;
    }

    return {
        formData,
        handleSubmit,
        handleFileChange,
        handleChange,
        boxList,
        coverList
    };
}

export default AddNewBackModelLogic;
