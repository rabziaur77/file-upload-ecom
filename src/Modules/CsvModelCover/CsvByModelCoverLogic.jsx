import { useEffect, useState } from "react";
import APIService from "../Service/API_Service";
import { useNavigate } from "react-router-dom";


const brandCoverFlip=[
    "By Brand",
    "Flip Cover",
    "Cover"
]

const brand=[
    "MYSHANZ",
    "MAXSHOPY",
    "MAXSHAD"
]
const manufacturer=[
    "MYSHA ENTERPRISES",
    "M A ENTERPRISES",
    "MAX SHOPY DELHI"
]
function CsvByModelCoverLogic(){
    const navigate = useNavigate();
    const[models, setModels]=useState([]);
    const[covers, setCover]=useState([]);
    const [selectedCovers, setSelectedCovers] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const[elementModel, setElementModel] = useState(
        {selectedModel:"", selectBrand:'', selectedManufacture:'', company:'', address:'', pincode:''}
    );
    const btnList = ["Flipkart", "Flipkart XL", "Meesho Excel", "Shopsy XL"];

    useEffect(()=>{
        fetchModels();
        fetchCovers();
    },[])

    const fetchModels = async ()=>{
        try {
            const response = await APIService.GetService("/api/MobileModels/GetModelList");
            console.log("API Response:", response);
            
            // Check the structure of the response
            if (response && response.response) {
               const modelMap = response.response.filter(model => model.isActive);
               setModels(modelMap);
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
            console.log("API Response:", response);
            
            // Check the structure of the response
            if (response && response.response) {
                const coverMap = response.response.filter(cover => cover.isActive);
                setCover(coverMap);
            } else {
                console.warn("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Failed to fetch models:", error);
        }
    }
    
    const handleCoverChange = (coverName) => {
        setSelectedCovers((prevSelected) => {
            const updatedSelection = { ...prevSelected, [coverName]: !prevSelected[coverName] };
    
            // Check if all covers are selected
            const allSelected = Object.keys(updatedSelection).length === covers.length &&
                                Object.values(updatedSelection).every(Boolean);
    
            setSelectAll(allSelected);
            return updatedSelection;
        });
    };
    
    const handleChange=(e)=>{
        const{name,value}=e.target;

        setElementModel((prev)=>({...prev, [name]:value}))


        if(name === "selectedManufacture")
            setElementModel((prev)=>({...prev, company:value}))
    }

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

    const clickForEcom=(ecom)=>{
        const ecomMap = {
            "Flipkart": "Flipkart",
            "Flipkart XL": "FlipkartXL",
            "Meesho Excel": "MeeshoExcel",
            "Shopsy XL": "ShopsyXL",
        };
        if (ecomMap[ecom]) {
            redirectEcom(ecomMap[ecom]);
        }
    }

    const redirectEcom=(callEcom)=>{
        if(elementModel.selectedModel==="" || elementModel.selectBrand==="" || Object.keys(selectedCovers)<=0 || elementModel.selectedManufacture ===""){
            alert("Please select mandatory point")
            return
        }

        let lstCovers=[];
        for(var obj of Object.keys(selectedCovers)){
            if(selectedCovers[obj]){
                lstCovers.push(obj)
            }
        }

        const masterModel={
            selectedEcom: callEcom,
            selectedModel: models.find(model=> model.modelName === elementModel.selectedModel),
            selectedBrand: elementModel.selectBrand,
            selectedManufacturer: elementModel.selectedManufacture,
            selectedCovers: covers.filter(cover=> lstCovers.includes(cover.coverName)),
            company: elementModel.company,
            address: elementModel.address,
            pincode: elementModel.pincode
        }

        navigate("/final-config", {state: masterModel})
    }

    return{
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
        btnList
    }
}

export default CsvByModelCoverLogic