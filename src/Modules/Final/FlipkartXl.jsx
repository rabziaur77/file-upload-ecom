import React from "react";
import { Table } from "react-bootstrap";
import { BASE_URL } from "../Service/API_Service";
import './config.css'

function FlipKartXl({ mergedData }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Seller SKU ID</th>
                    <th>X2</th>
                    <th>MRP</th>
                    <th>Flipkart Price</th>
                    <th>X3</th>
                    <th>Product Price</th>
                    <th>Sales QTY</th>
                    <th>QTY	</th>
                    <th>Product Stock</th>
                    <th>HSN</th>
                    <th>Countery of origin</th>
                    <th>Manufacturer Details</th>
                    <th>Manufacturer Details</th>
                    <th>Tax</th>
                    <th>Z</th>
                    <th>AA</th>
                    <th>AB</th>
                    <th>AC</th>
                    <th>AD</th>
                    <th>AE</th>
                    <th>AF</th>
                    <th>AG</th>
                    <th>AH</th>
                    <th>AI</th>
                    <th>AJ</th>
                    <th>AK</th>
                    <th>AL</th>
                    <th>AM</th>
                    <th>AN</th>
                    <th>AO</th>
                    <th>AP</th>
                    <th>AQ</th>
                    <th>AR</th>
                    <th style={{ minWidth: 500 }}>AS</th>
                    <th>AT</th>
                    <th>AU</th>
                </tr>
            </thead>
            <tbody>
                {mergedData.map((item, index) => {
                    const getImageUrl = (url) => (url?.startsWith("https") ? url : url !== null ? BASE_URL + url : "");

                    return (
                        <tr key={index}>
                            <td>{item.sellerSkuId || "N/A"}</td>
                            <td>{item.x2 || "N/A"}</td>
                            <td>{item.mrp || "N/A"}</td>
                            <td>{item.flipkartPrice || "N/A"}</td>
                            <td>{item.x3 || "N/A"}</td>
                            <td>{item.productPrice || "N/A"}</td>
                            <td>{item.salesQty || "N/A"}</td>
                            <td>{item.qty || "N/A"}</td>
                            <td>{item.productStock || "N/A"}</td>
                            <td>{item.hsn || "N/A"}</td>
                            <td>{item.countryOfOrigin || "N/A"}</td>
                            <td>{item.manufacturerDetails || "N/A"}</td>
                            <td>{item.manufacturerDetails || "N/A"}</td>
                            <td>{item.tax || "N/A"}</td>
                            <td>{item.z || "N/A"}</td>
                            <td>{item.aa || "N/A"}</td>
                            <td>{item.ab || "N/A"}</td>
                            <td>{item.ac || "N/A"}</td>
                            <td>{item.ad || "N/A"}</td>
                            <td>{item.ae || "N/A"}</td>
                            <td>{item.af || "N/A"}</td>
                            <td>{item.ag || "N/A"}</td>
                            <td>{item.ah || "N/A"}</td>
                            <td>{item.ai || "N/A"}</td>
                            <td>
                                <div className="img-link">{getImageUrl(item.aj)}</div>
                                {item.aj && <img src={getImageUrl(item.aj)} alt="Main" width="100" />}
                            </td>
                            <td>
                                <div className="img-link">{getImageUrl(item.ak)}</div>
                                {item.ak && <img src={getImageUrl(item.ak)} alt="Main" width="100" />}
                            </td>
                            <td>
                                <div className="img-link">{getImageUrl(item.al)}</div>
                                {item.al && <img src={getImageUrl(item.al)} alt="Main" width="100" />}
                            </td>
                            <td>
                                <div className="img-link">{getImageUrl(item.am)}</div>
                                {item.am && <img src={getImageUrl(item.am)} alt="Main" width="100" />}
                            </td>
                            <td>
                                <div className="img-link">{getImageUrl(item.an)}</div>
                                {item.an && <img src={getImageUrl(item.an)} alt="Main" width="100" />}
                            </td>
                            <td>{item.ao || "N/A"}</td>
                            <td>{item.ap || "N/A"}</td>
                            <td>{item.aq || "N/A"}</td>
                            <td>{item.ar || "N/A"}</td>
                            <td>{item.as || "N/A"}</td>
                            <td>{item.at || "N/A"}</td>
                            <td>{item.au || "N/A"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}

export default FlipKartXl;