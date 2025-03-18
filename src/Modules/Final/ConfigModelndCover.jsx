import React, { useRef, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import APIService, { BASE_URL } from "../Service/API_Service";
import './config.css'

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
        await APIService.PostService("/api/FinalConfig/getMergedInformation", location.state)
            .then(response => {
                console.log(response);
                if (Array.isArray(response))
                    setMergedImageUrl(response)
                else
                    alert(response)
            })

        setLoading('Completed.')
    };

    return (
        <>
            <div className="tbl-data">
                <h1 className="h2 border-bottom pb-2">Final Configuration</h1>
                <div>
                    {loading}
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Seller SKU ID</th>
                            <th>Brand</th>
                            <th>Model Number</th>
                            <th>Type</th>
                            <th>Color</th>
                            <th>Designed For</th>
                            <th>Material</th>
                            <th>Suitable Device</th>
                            <th>Sales Package</th>
                            <th>Theme</th>
                            <th>Brand Color</th>
                            <th>Main Image URL</th>
                            <th>Other Image URL1</th>
                            <th>Other Image URL2</th>
                            <th>Other Image URL3</th>
                            <th>Other Image URL4</th>
                            <th>Other Image URL5</th>
                            <th>Other Image URL6</th>
                            <th>Features</th>
                            <th>EAN/UPC</th>
                            <th>EAN/UPC Measuring Unit</th>
                            <th style={{ minWidth: 500 }}>Pack Of</th>
                            <th>Description</th>
                            <th>Search Keyword</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mergedData.map((item, index) => {
                            const getImageUrl = (url) => (url?.startsWith("https") ? url : url !== null ? BASE_URL + url : "");

                            return (
                                <tr key={index}>
                                    <td>{item.sellerSkuId || "N/A"}</td>
                                    <td>{item.brand || "N/A"}</td>
                                    <td>{item.modelNumber || "N/A"}</td>
                                    <td>{item.type || "N/A"}</td>
                                    <td>{item.color || "N/A"}</td>
                                    <td>{item.designedFor || "N/A"}</td>
                                    <td>{item.material || "N/A"}</td>
                                    <td>{item.suitableDevice || "N/A"}</td>
                                    <td>{item.salesPackage || "N/A"}</td>
                                    <td>{item.theme || "N/A"}</td>
                                    <td>{item.brandColor || "N/A"}</td>
                                    <td>
                                        <div className="img-link">{getImageUrl(item.mainImageUrl)}</div>
                                        {item.mainImageUrl && <img src={getImageUrl(item.mainImageUrl)} alt="Main" width="100" />}
                                    </td>
                                    <td>
                                        <div className="img-link">{getImageUrl(item.otherImageUrl1)}</div>
                                        {item.otherImageUrl1 && <img src={getImageUrl(item.otherImageUrl1)} alt="Other 1" width="100" />}
                                    </td>
                                    <td>
                                        <div className="img-link">{getImageUrl(item.otherImageUrl2)}</div>
                                        {item.otherImageUrl2 && <img src={getImageUrl(item.otherImageUrl2)} alt="Other 2" width="100" />}
                                    </td>
                                    <td>
                                        <div className="img-link">{getImageUrl(item.otherImageUrl3)}</div>
                                        {item.otherImageUrl3 && <img src={getImageUrl(item.otherImageUrl3)} alt="Other 3" width="100" />}
                                    </td>
                                    <td>
                                        <div className="img-link">{getImageUrl(item.otherImageUrl4)}</div>
                                        {item.otherImageUrl4 && <img src={getImageUrl(item.otherImageUrl4)} alt="Other 4" width="100" />}
                                    </td>
                                    <td>
                                        <div className="img-link">{getImageUrl(item.otherImageUrl5)}</div>
                                        {item.otherImageUrl5 && <img src={getImageUrl(item.otherImageUrl5)} alt="Other 5" width="100" />}
                                    </td>
                                    <td>
                                        <div className="img-link">{getImageUrl(item.otherImageUrl6)}</div>
                                        {item.otherImageUrl6 && <img src={getImageUrl(item.otherImageUrl6)} alt="Other 6" width="100" />}
                                    </td>
                                    <td>{item.features || "N/A"}</td>
                                    <td>{item.eAN_UPC || "N/A"}</td>
                                    <td>{item.eAN_UPC_MeasuringUnit || "N/A"}</td>
                                    <td>{item.packOf || "N/A"}</td>
                                    <td>{item.description || "N/A"}</td>
                                    <td>{item.searchKeyWord || "N/A"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

            </div>
        </>
    );
};

export default FinalConfig;
