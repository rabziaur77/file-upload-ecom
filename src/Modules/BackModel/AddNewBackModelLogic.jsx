import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showPopup, hidePopup } from "../../redux/popupslice";
import APIService from "../Service/API_Service";

function AddNewBackModelLogic(initialData = null) {
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const [boxList, setBoxList] = useState([]);
  const [coverList, setCoverList] = useState([]);
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
        boxNo: initialData.boxNumber || "",
        coverName: initialData.coverName || "",
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
          initialData.watermark6,
        ],
      });
    }
  }, [initialData]);

  const fetchModels = async () => {
    try {
      const response = await APIService.GetService(
        "/api/MobileModels/GetModelList"
      );
      if (response && response.response) {
        setBoxList(response.response);
      } else {
        console.warn("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
  };

  const fetchCovers = async () => {
    try {
      const response = await APIService.GetService(
        "/api/MobileBackCovers/GetCoverList"
      );
      if (response && response.response) {
        setCoverList(response.response);
      } else {
        console.warn("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "boxNo") {
      const selectedBox = boxList.find((box) => box.boxNumber === value);
      console.log("Selected Box:", selectedBox.modelName);
      setFormData((prev)=>({...prev, companyName: selectedBox?.companyName || "", address: selectedBox?.address || "", pincode: selectedBox?.pincode || ""}));
      for (let i = 1; i <= 3; i++) {
        document.getElementById(`WatermarkText${i}`).value = "For " + (selectedBox.modelName || `WATERMARK ${i}`);
      }
    }
  };

  const handleFileChange = (e, index) => {
    const files = [...formData.watermarks];
    files[index] = e.target.files[0];
    setFormData({ ...formData, watermarks: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(initialData);
    dispatch(showPopup("Please, Wait..."));

    const requestData = await bindData();
    var URL = "";
    if (initialData === null) {
      URL = "/api/MobileBackModels/AddModel";
    } else {
      URL = "/api/MobileBackModels/UpdateModel";
    }
    APIService.PostFormService(URL, requestData)
      .then((rep) => {
        let message = rep.message != undefined ? rep.message : rep;
        dispatch(showPopup(message));
        setTimeout(() => {
          dispatch(hidePopup());
        }, 1500);
      })
      .catch((ex) => {
        dispatch(showPopup("Something went wrong, please contact to support."));
        setTimeout(() => {
          dispatch(hidePopup());
        }, 1000);
      });
  };

  const bindData = async () => {
    const requestData = new FormData();

    //requestData.append('PlainOrCurve', formData.selectStyle);
    //requestData.append('Size', formData.selectSize);
    requestData.append("CoverName", formData.coverName);
    requestData.append("BoxNumber", formData.boxNo);
    requestData.append("CompanyName", formData.companyName);
    requestData.append("Address", formData.address);
    requestData.append("Pincode", formData.pincode);
    requestData.append(
      "Watermark4",
      boxList.find((b) => b.boxNumber === formData.boxNo)?.watermark4 || ""
    );

    // Append MobileModelRequest properties
    if (initialData === null) {
      // Get files using IDs
      for (let i = 1; i <= 3; i++) {
        const fileInput = document.getElementById(`Watermark${i}`);
        if (fileInput?.files?.[0]) {
          const watermarkedBlob = await addWatermark(fileInput.files[0], document.getElementById(`WatermarkText${i}`).value || `WATERMARK ${i}`);
          requestData.append("watermarks", watermarkedBlob, fileInput.files[0].name);
          requestData.append(`watermarkIds`, i);
        }
      }
    } else {
      requestData.append("ModelID", initialData.modelID);

      for (let i = 1; i <= 6; i++) {
        const fileInput = document.getElementById(`Watermark${i}`);
        if (fileInput?.files?.[0]) {
          const watermarkedBlob = await addWatermark(fileInput.files[0], document.getElementById(`WatermarkText${i}`).value || `WATERMARK ${i}`);
          requestData.append("watermarks", watermarkedBlob, fileInput.files[0].name);
          requestData.append(`watermarkIds`, i);
        }
      }
    }
    return requestData;
  };

  const addWatermark = (file, watermarkText) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          // Draw original image
          ctx.drawImage(img, 0, 0);

          // Add watermark
          ctx.font = "48px Arial";
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(watermarkText, canvas.width / 2, 0);

          // Convert back to blob
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/png",
            0.95
          );
        };
      };
      reader.readAsDataURL(file);
    });
  };

  return {
    formData,
    handleSubmit,
    handleFileChange,
    handleChange,
    boxList,
    coverList,
    canvasRef,
    preview,
  };
}

export default AddNewBackModelLogic;
