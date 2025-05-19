import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import APIService, { BASE_URL } from "../Service/API_Service";
import FlipKart from "./Flipkart";
import FlipKartXl from "./FlipkartXl";
import MeeshoXL from "./MeeshoXL";

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
        let apiURL = location.state.selectedEcom === "Flipkart" ? "/api/FinalConfig/getMergedInformation" :
            location.state.selectedEcom === "FlipkartXL" ? "/api/FinalConfig/getMergedInformationFlipkartXl" :
                location.state.selectedEcom === "MeeshoExcel" ? "/api/FinalConfig/getMergedInformationMeeshoExcel" : "";

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

    // const getDataClipboard = () => {
    //     const headers = Object.keys(mergedData[0]);
    //     const tsvRows = [];
    
    //     // Add headers (tab-separated)
    //     tsvRows.push(headers.join('\t'));
    
    //     // Add each row
    //     for (const row of mergedData) {
    //         const values = headers.map(header => {
    //             const val = row[header] !== null ? row[header] : '';
    //             return String(val).replace(/\t/g, ' '); // avoid tab chars inside values
    //         });
    //         tsvRows.push(values.join('\t'));
    //     }
    
    //     const tsv = tsvRows.join('\r\n'); // Use CRLF for Excel compatibility
    
    //     // Use textarea trick for consistent clipboard behavior
    //     const textarea = document.createElement('textarea');
    //     textarea.value = tsv;
    //     document.body.appendChild(textarea);
    //     textarea.select();
    //     try {
    //         document.execCommand('copy');
    //         alert('Copied data (TSV) to clipboard! Paste into Excel.');
    //     } catch (err) {
    //         alert('Copy failed: ' + err);
    //     }
    //     document.body.removeChild(textarea);
    // };

    const getDataClipboard = () => {
        const table = document.querySelector('.table-striped');
        if (!table) return alert('Table not found!');
    
        const rows = Array.from(table.querySelectorAll('tr'));
        const tsvData = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('th, td'));
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
                    mergedData.length > 0 ?
                        location.state.selectedEcom === "Flipkart" ?
                            <FlipKart mergedData={mergedData} />
                            : location.state.selectedEcom === "FlipkartXL" ?
                                <FlipKartXl mergedData={mergedData} />
                                : location.state.selectedEcom === "MeeshoExcel" ?
                                    <MeeshoXL mergedData={mergedData} />
                                    : null
                        : null
                }
            </div>
        </>
    );
};

export default FinalConfig;
