import { useEffect, useState } from "react";
import APIService from "../Service/API_Service";
import { useNavigate } from "react-router-dom";


const brandCoverFlip=[
    "By Brand",
    "Flip Cover",
    "Cover"
]

const brand=[
    "MYSHANZ"
]
const manufacturer=[
    "MYSHA ENTERPRISES"
]
function CsvByModelCoverLogic(){
    const navigate = useNavigate();
    const[models, setModels]=useState([]);
    const[covers, setCover]=useState([]);
    const [selectedCovers, setSelectedCovers] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const[elementModel, setElementModel] = useState({selectedModel:"", selectBrand:'', selectedManufacture:''})
    const btnList = ["Flipkart", "Flipkart XL", "Meesho Excel"];

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
                setModels(response.response);
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
                setCover(response.response);
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
        switch(ecom){
            case "Flipkart":
                redirectEcom("Flipkart");
                break;
            case "Flipkart XL":
                redirectEcom("FlipkartXL");
                break;
            case "Meesho Excel":
                redirectEcom("MeeshoExcel");
                break;
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
            selectedCovers: covers.filter(cover=> lstCovers.includes(cover.coverName))
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