import { useEffect, useState } from "react";
import APIService from "../Service/API_Service";
import { useNavigate } from "react-router-dom";

const brandCoverFlip = ["By Brand", "Flip Cover", "Cover"];

const brand = ["MYSHANZ", "MAXSHOPY", "MAXSHAD"];
const manufacturer = [
  "MYSHA ENTERPRISES",
  "M A ENTERPRISES",
  "MAX SHOPY DELHI",
];

const modelBrandList = [
  {
    Brand: "MYSHANZ",
    CompanyName: "MYSHA ENTERPRISES",
    Address: "D265 AFE N.Delhi",
    PinCode: "110025",
  },
  {
    Brand: "MAXSHOPY",
    CompanyName: "M A ENTERPRISES",
    Address: "D266 AFE N.Delhi",
    PinCode: "110025",
  },
  {
    Brand: "MAXSHAD",
    CompanyName: "MAX SHOPY DELHI",
    Address: "D266 AFE N.Delhi",
    PinCode: "110025",
  },
];

function CsvByModelBackCoverLogic() {
  const navigate = useNavigate();
  const [selectedModels, setSelectedModels] = useState([]);
  const [masterModels, setMasterModels] = useState([]);
  const [models, setModels] = useState([]);
  const [covers, setCover] = useState([]);
  const [masterCovers, setMasterCover] = useState([]);
  const [selectedCovers, setSelectedCovers] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [elementModel, setElementModel] = useState({
    selectBrand: "",
    selectedManufacture: "",
    company: "",
    address: "",
    pincode: "",
  });
  const btnList = ["Flipkart", "Flipkart XL", "Meesho Excel", "Shopsy XL"];

  useEffect(() => {
    fetchModels();
    fetchCovers();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await APIService.GetService(
        "/api/MobileBackModels/GetModelList"
      );
      console.log("API Response:", response);

      // Check the structure of the response
      if (response && response.response) {
        const modelMap = response.response.filter((model) => model.isActive);
        setMasterModels(modelMap);

        const uniqueModels = modelMap.filter(
          (model, index, self) =>
            index === self.findIndex((m) => m.boxNumber === model.boxNumber)
        );

        setModels(uniqueModels);
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
      console.log("API Response:", response);

      // Check the structure of the response
      if (response && response.response) {
        const coverMap = response.response.filter((cover) => cover.isActive);
        setMasterCover(coverMap);
      } else {
        console.warn("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
  };

  const handleCoverChange = (coverName) => {
    setSelectedCovers((prevSelected) => {
      const updatedSelection = {
        ...prevSelected,
        [coverName]: !prevSelected[coverName],
      };

      // Check if all covers are selected
      const allSelected =
        Object.keys(updatedSelection).length === covers.length &&
        Object.values(updatedSelection).every(Boolean);

      setSelectAll(allSelected);
      return updatedSelection;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setElementModel((prev) => ({ ...prev, [name]: value }));

    if (name === "selectBrand") {
      selectedBrandChange(value);
    }
  };

  const selectedBrandChange = (value) => {
    const modelInfo = modelBrandList.find(
      (m) => m.Brand.toLowerCase() === value.toLowerCase()
    );
    if (modelInfo) {
      setElementModel((prev) => ({
        ...prev,
        company: modelInfo.CompanyName,
        address: modelInfo.Address,
        pincode: modelInfo.PinCode,
        selectedManufacture: modelInfo.CompanyName,
      }));
    }
  };

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => {
      const newState = !prevSelectAll;

      // Update all covers to checked/unchecked
      const updatedCovers = covers.reduce((acc, cover) => {
        acc[cover.coverName] = newState;
        return acc;
      }, {});

      setSelectedCovers(updatedCovers);
      return newState;
    });
  };

  const clickForEcom = (ecom) => {
    const ecomMap = {
      Flipkart: "Flipkart",
      "Flipkart XL": "FlipkartXL",
      "Meesho Excel": "MeeshoExcel",
      "Shopsy XL": "ShopsyXL",
    };
    if (ecomMap[ecom]) {
      redirectEcom(ecomMap[ecom]);
    }
  };

  const redirectEcom = (callEcom) => {
    if (
      selectedModels.length === 0 ||
      elementModel.selectBrand === "" ||
      Object.keys(selectedCovers) <= 0 ||
      elementModel.selectedManufacture === ""
    ) {
      alert("Please select mandatory point");
      return;
    }

    let lstCovers = [];
    for (var obj of Object.keys(selectedCovers)) {
      if (selectedCovers[obj]) {
        lstCovers.push(obj);
      }
    }

    const masterModel = {
      selectedEcom: callEcom,
      selectedModel: masterModels.filter((model) =>
        selectedModels.some((selected) => {
          return model.boxNumber === selected;
        })
      ),
      selectedBrand: elementModel.selectBrand,
      selectedManufacturer: elementModel.selectedManufacture,
      selectedCovers: covers.filter((cover) =>
        lstCovers.includes(cover.coverName)
      ),
      company: elementModel.company,
      address: elementModel.address,
      pincode: elementModel.pincode,
    };

    navigate("/back-final-config", { state: masterModel });
  };

  const handleChangeMultiSelect = (newValue = []) => {
    setSelectedModels(newValue);
    const matchedModels = masterModels.filter(
      (model) => model.isActive && newValue.includes(model.boxNumber)
    );

    const matchedCovers = matchedModels.flatMap((model) =>
      masterCovers.filter(
        (cover) => cover.isActive && cover.coverName === model.coverName
      )
    );

    const uniqueCovers = matchedCovers.filter(
      (cover, index, self) =>
        index === self.findIndex(c => c.coverName === cover.coverName)
    );

    setCover(uniqueCovers);

    //setCover(matchedCovers);
  };

  return {
    models,
    covers,
    brandCoverFlip,
    selectAll,
    selectedCovers,
    handleSelectAll,
    handleCoverChange,
    brand,
    elementModel,
    handleChange,
    manufacturer,
    clickForEcom,
    btnList,
    selectedModels,
    handleChangeMultiSelect,
  };
}

export default CsvByModelBackCoverLogic;
