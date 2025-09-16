import { useState, useEffect } from "react";
import APIService from "../Service/API_Service";
import { useDispatch } from "react-redux";
import { hidePopup, showPopup } from "../../redux/popupslice";

function CoverContentLogic(initialData = null) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    groupName: "",
    initial: "",
    coverName: "",
    types: "",
    materials: "",
    brandColors: "",
    features: "",
    themes: "",
    colors: "",
    devices: "",
    insidePacks: "",
    productPrice: "",
    productStock: "",
    skuReference: "",
    hsnCode: "",
    taxCode: "",
    weight: "",
    width: "",
    height: "",
    length: "",
    packer: "",
    importer: "",
    manufacturerDetail: "",
    flipkartPrice: "",
    shopsyPrice: "",
    meeshoPrice: "",
    mrp: "",
    taxRate: "",
    weightFlipkartInKg: "",
    weightMeeshoInGrams: "",
    qty: "",
    salesQTY: "",
    countryOfOrigin: "",
    type: "",
    x1: null,
    x2: null,
    x3: null,
    x4: null,
    x5: null,
    x6: null,
    x7: null,
    x8: null,
    x9: null,
    x10: null,
    x11: null,
    x12: null,
    x13: null,
    x14: null,
    x15: null,
    x16: null,
    x17: null,
    x18: null,
    x19: null,
    x20: null,
    x21: null,
    x22: null,
    x23: null,
    x24: null,
    x25: null,
    description: "",
    keywords: "",
    features1: "",
    features2: "",
    features3: "",
    features4: "",
    covers: Array(6).fill(null), // Stores uploaded files
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        covers: [
          initialData.cover1,
          initialData.cover2,
          initialData.cover3,
          initialData.cover4,
          initialData.cover5,
          initialData.cover6,
        ],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, index) => {
    const files = [...formData.covers];
    files[index] = e.target.files[0]; // Store file at the correct index
    setFormData((prevData) => ({
      ...prevData,
      covers: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showPopup("Please, Wait..."));

    console.log("Submitting form data...", formData);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (!key.includes("cover")) {
          let val =
            formData[key] === "" || formData[key] === null
              ? null
              : formData[key];
          formDataToSend.append(key, val);
        } else if (key === "coverName") {
          let val =
            formData[key] === "" || formData[key] === null
              ? null
              : formData[key];
          formDataToSend.append(key, val);
        }
      }

      for (let i = 1; i <= 6; i++) {
        const fileInput = document.getElementById(`cover${i}`);
        if (fileInput?.files?.[0]) {
          formDataToSend.append("covers", fileInput.files[0]);
          formDataToSend.append(`coverIds`, i);
        }
      }

      if (initialData !== null) {
        formDataToSend.append("Id", initialData.id);
      }
      // Call API to submit form data
      const response = await APIService.PostFormService(
        "/api/MobileCovers/AddCover",
        formDataToSend
      );

      let message = response.message != undefined ? response.message : response;

      dispatch(showPopup(message));
      setTimeout(() => {
        dispatch(hidePopup());
      }, 1000);
    } catch (error) {
      console.error("Submission failed:", error);
      dispatch(showPopup("Something went wrong, please contact to support."));
      setTimeout(() => {
        dispatch(hidePopup());
      }, 1000);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleFileChange,
  };
}

export default CoverContentLogic;
