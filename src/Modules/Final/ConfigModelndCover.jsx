import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import APIService, { BASE_URL } from "../Service/API_Service";
import FlipKart from "./Flipkart";
import FlipKartXl from "./FlipkartXl";
import MeeshoXL from "./MeeshoXL";
import ShopsyXl from "./Shopsy";

const FinalConfig = () => {
    const location = useLocation();
    const [loading, setLoading] = useState('');
    const [mergedData, setMergedImageUrl] = useState([]);

    useEffect(() => {
        if (location.state?.selectedCovers.length > 0) {
            mergeImages();
        }
    }, [location.state]);

    const mergeImages = async () => {
        setLoading('Please Wait...')

        const apiMap = {
            Flipkart: "/api/FinalConfig/getMergedInformation",
            FlipkartXL: "/api/FinalConfig/getMergedInformationFlipkartXl",
            MeeshoExcel: "/api/FinalConfig/getMergedInformationMeeshoExcel",
            ShopsyXL: "/api/FinalConfig/getMergedInformationShopsyExcel"
        };

        const apiURL = apiMap[location.state?.selectedEcom] || "";

        await APIService.PostService(apiURL, location.state)
            .then(response => {
                console.log(response);
                if (Array.isArray(response))
                    setMergedImageUrl(response)
                else
                    alert(response)
            })

        setLoading('Completed.')
    };
    const getDataClipboard = () => {
        const table = document.querySelector('.table-striped');
        if (!table) return alert('Table not found!');
    
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const tsvData = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            return cells.map(cell =>
                cell.innerText.trim().replace(/\t/g, ' ') // avoid actual tab chars
            ).join('\t');
        }).join('\r\n'); // CRLF for Excel
    
        // Create and use hidden textarea
        const textarea = document.createElement('textarea');
        textarea.value = tsvData;
        document.body.appendChild(textarea);
        textarea.style.position = 'fixed';  // Prevent scroll jump
        textarea.style.opacity = '0';       // Hide from view
        textarea.select();
    
        try {
            document.execCommand('copy');
            alert('Table data copied! Paste into Excel.');
        } catch (err) {
            alert('Copy failed: ' + err.message);
        }
    
        document.body.removeChild(textarea);
    };
    
    const componentMap = {
        Flipkart: FlipKart,
        FlipkartXL: FlipKartXl,
        MeeshoExcel: MeeshoXL,
        ShopsyXL: ShopsyXl
    };
      
    const SelectedComponent = componentMap[location.state?.selectedEcom] || null;
    return (
        <>
            <div className="tbl-data">
                <h1 className="h2 border-bottom pb-2">Final Configuration</h1>
                <div>
                    {loading}
                </div>
                <div>
                    {
                        mergedData.length > 0 ?
                            <button className="btn btn-secondary" onClick={getDataClipboard}>Copy</button>
                            : null
                    }
                </div>
                {
                    SelectedComponent && <SelectedComponent mergedData={mergedData} />
                }
            </div>
        </>
    );
};

export default FinalConfig;
