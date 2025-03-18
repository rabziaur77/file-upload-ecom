import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showPopup, hidePopup } from "../../redux/popupslice";
import APIService from "../Service/API_Service";

function MobileModelLogic(initialData = null) {
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

    useEffect(() => {
        if (initialData) {
            setFormData({
                modelName: initialData.modelName || "",
                skuModelName: initialData.skuModelName || "",
                boxNo: initialData.boxNumber || "",
                softwareVersion: initialData.softwareVersion || "",
                selectStyle: initialData.plainOrCurve || "Plain",
                selectSize: initialData.size || "Small",
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
        APIService.PostFormService("/api/MobileModels/AddModel", requestData)
            .then((rep) => {
                let message = rep.message != undefined?rep.message: rep;
                dispatch(showPopup(message))
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

    const bindData = () => {
        const requestData = new FormData();

        requestData.append('ModelName', formData.modelName);
        requestData.append('SkuModelName', formData.skuModelName);
        requestData.append('BoxNumber', formData.boxNo);
        requestData.append('SoftwareVersion', formData.softwareVersion);
        requestData.append('PlainOrCurve', formData.selectStyle);
        requestData.append('Size', formData.selectSize);

        // Append MobileModelRequest properties
        if (initialData === null) {
            // Get files using IDs
            for (let i = 1; i <= 6; i++) {
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
    };
}

export default MobileModelLogic;
