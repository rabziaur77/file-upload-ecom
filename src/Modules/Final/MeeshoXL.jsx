import React from "react";
import { Table } from "react-bootstrap";
import { BASE_URL } from "../Service/API_Service";

function MeeshoXL({ mergedData }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Desgine For</th>
                    <th>x11</th>
                    <th>Meesho Price</th>
                    <th>x12</th>
                    <th>MRP</th>
                    <th>Tax Rate</th>
                    <th>HSN</th>
                    <th>Weight</th>
                    <th>QTY</th>
                    <th>Countery of origine</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    {/* <th>Manufacurar</th> */}
                    <th>E</th>
                    {/* <th>Packer</th> */}
                    <th>Meesho Compatible</th>
                    <th>X14</th>
                    <th>X15</th>
                    <th>Sales QTY</th> 
                    {/* <th>E</th> */}
                    <th>X16</th>
                    <th>X17</th>
                    {/* <th>Model From Mesho Model list</th>
                    <th>G</th>
                    <th>Sales QTY</th> 
                    <th>J</th> */}
                    <th>L</th>
                    <th>M</th>
                    <th>N</th>
                    <th>P</th>
                    <th>Reh</th>
                    <th>Anz</th>
                    <th>Brand Name</th>
                    {/* <th>A+ ZY</th> */}
                    <th>MODEL ID + GROPU NAME</th>
                    {/* <th>Brand</th>
                    <th>Group id</th> */}
                    <th>U + Model Name in Place Of Flip Cover</th>
                    <th>X18</th>
                    <th>X19</th>
                </tr>
            </thead>
            <tbody>
                {
                    mergedData.map((item, index) => {
                        const getImageUrl = (url) => (url?.startsWith("https") ? url : url !== null ? BASE_URL + url : "");
                        return (
                            <tr key={index}>
                                <td>{item.designFor || "N/A"}</td>
                                <td>{item.x11 || ""}</td>
                                <td>{item.meeshoPrice || "N/A"}</td>
                                <td>{item.x12 || ""}</td>
                                <td>{item.mrp || "N/A"}</td>
                                <td>{item.taxRate || "N/A"}</td>
                                <td>{item.hsn || "N/A"}</td>
                                <td>{item.weight || "N/A"}</td>
                                <td>{item.quantity || "N/A"}</td>
                                <td>{item.countryOfOrigin || "N/A"}</td>
                                <td>{item.companyName || "N/A"}</td>
                                <td>{item.address || "N/A"}</td>
                                <td>{item.pincode || "N/A"}</td>
                                <td>{item.companyName || "N/A"}</td>
                                <td>{item.address || "N/A"}</td>
                                <td>{item.pincode || "N/A"}</td>
                                <td>{item.companyName || "N/A"}</td>
                                <td>{item.address || "N/A"}</td>
                                <td>{item.pincode || "N/A"}</td>
                                {/* <td>{item.manufacturer || "N/A"}</td> */}
                                {/* <td>{item.packer || "N/A"}</td> */}
                                <td>{item.e || "N/A"}</td>
                                <td>{item.meeshoCompatible || ""}</td>
                                <td>{item.x14 || ""}</td>
                                <td>{item.x15 || ""}</td>
                                <td>{item.salesQuantity || "N/A"}</td>
                                {/* <td>{item.e || "N/A"}</td> */}
                                <td>{item.x16 || ""}</td>
                                <td>{item.x17 || ""}</td>
                                {/* <td>{item.modelFromMeeshoList || "N/A"}</td>
                                <td>{item.g || "N/A"}</td>
                                <td>{item.salesQuantity || "N/A"}</td>
                                <td>{item.j || "N/A"}</td> */}
                                <td>
                                    <div className="img-link">{getImageUrl(item.l)}</div>
                                    {item.l && <img src={getImageUrl(item.l)} alt="Main" width="100" />}
                                </td>
                                <td>
                                    <div className="img-link">{getImageUrl(item.m)}</div>
                                    {item.m && <img src={getImageUrl(item.m)} alt="Main" width="100" />}
                                </td>
                                <td>
                                    <div className="img-link">{getImageUrl(item.n)}</div>
                                    {item.n && <img src={getImageUrl(item.n)} alt="Main" width="100" />}
                                </td>
                                <td>
                                    <div className="img-link">{getImageUrl(item.p)}</div>
                                    {item.p && <img src={getImageUrl(item.p)} alt="Main" width="100" />}
                                </td>
                                <td>{item.reh || ""}</td>
                                <td>{item.anz || ""}</td>
                                <td>{item.selectedBrand || "N/A"}</td>
                                {/* <td>{item.aPlusZY || "N/A"}</td> */}
                                {/* <td>{item.aPlusZY || "N/A"}</td>
                                <td>{item.aPlusZH || "N/A"}</td>
                                <td>{item.brand || "N/A"}</td> */}
                                <td>{item.modelID || ""}{item.groupName || ""}</td>
                                <td style={{ minWidth: 500 }}>{item.uModelName || "N/A"}</td>
                                <td>{item.x18 || ""}</td>
                                <td>{item.x19 || ""}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default MeeshoXL;

