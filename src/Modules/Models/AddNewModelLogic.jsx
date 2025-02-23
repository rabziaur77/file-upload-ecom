import { useState } from "react";
import { useDispatch } from "react-redux";
import { showPopup, hidePopup } from "../../redux/popupslice";
import APIService from "../Service/API_Service";

function MobileModelLogic() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        modelName: "",
        skuModelName: "",
        boxNo: "",
        softwareVersion: "",
        selectStyle: "Plain",
        selectSize: "Small",
        watermarks: [],
    });

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

        dispatch(showPopup("Please, Wait..."))

        const requestData = new FormData();

        // Append MobileModelRequest properties
        requestData.append('ModelName', formData.modelName);
        requestData.append('SkuModelName', formData.skuModelName);
        requestData.append('BoxNumber', formData.boxNo);
        requestData.append('SoftwareVersion', formData.softwareVersion);
        requestData.append('PlainOrCurve', formData.selectStyle);
        requestData.append('Size', formData.selectSize);

        // Get files using IDs
        for (let i = 1; i <= 6; i++) {
            const fileInput = document.getElementById(`Watermark${i}`);
            if (fileInput?.files?.[0]) {
                requestData.append('watermarks', fileInput.files[0]);
                requestData.append(`watermarkIds`, i);
            }
        }

        APIService.PostFormService("/api/MobileModels/AddModel", requestData)
            .then((rep) => {
                dispatch(showPopup("Data saved successfully."))
                setTimeout(() => {
                    dispatch(hidePopup())
                }, 1000)
            }).catch(ex => {
                dispatch(showPopup("Something went wrong, please contact to support."))
                setTimeout(() => {
                    dispatch(hidePopup())
                }, 1000)
            })
    };

    return {
        formData,
        handleSubmit,
        handleFileChange,
        handleChange,
    };
}

export default MobileModelLogic;
