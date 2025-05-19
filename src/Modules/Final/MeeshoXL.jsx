import React from "react";
import { Table } from "react-bootstrap";
import { BASE_URL } from "../Service/API_Service";

function MeeshoXL({ mergedData }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Desgine For</th>
                    <th>x1</th>
                    <th>Meesho Price</th>
                    <th>MRP</th>
                    <th>Tax Rate</th>
                    <th>HSN</th>
                    <th>Weight</th>
                    <th>QTY</th>
                    <th>Countery of origine</th>
                    <th>Manufacurar</th>
                    <th>Packer</th>
                    <th>E</th>
                    <th>Model From Mesho Model list</th>
                    <th>G</th>
                    <th>Sales QTY</th>
                    <th>J</th>
                    <th>L</th>
                    <th>M</th>
                    <th>N</th>
                    <th>P</th>
                    <th>A+ ZY</th>
                    <th>A + ZH</th>
                    <th>Brand</th>
                    <th>Group id</th>
                    <th>U + Model Name in Place Of Flip Cover</th>
                </tr>
            </thead>
            <tbody>
                {
                    mergedData.map((item, index) => {
                        const getImageUrl = (url) => (url?.startsWith("https") ? url : url !== null ? BASE_URL + url : "");
                        return (
                            <tr key={index}>
                                <td>{item.designFor || "N/A"}</td>
                                <td>{item.x1 || "N/A"}</td>
                                <td>{item.meeshoPrice || "N/A"}</td>
                                <td>{item.mrp || "N/A"}</td>
                                <td>{item.taxRate || "N/A"}</td>
                                <td>{item.hsn || "N/A"}</td>
                                <td>{item.weight || "N/A"}</td>
                                <td>{item.quantity || "N/A"}</td>
                                <td>{item.countryOfOrigin || "N/A"}</td>
                                <td>{item.manufacturer || "N/A"}</td>
                                <td>{item.packer || "N/A"}</td>
                                <td>{item.e || "N/A"}</td>
                                <td>{item.modelFromMeeshoList || "N/A"}</td>
                                <td>{item.g || "N/A"}</td>
                                <td>{item.salesQuantity || "N/A"}</td>
                                <td>{item.j || "N/A"}</td>
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
                                <td>{item.aPlusZY || "N/A"}</td>
                                <td>{item.aPlusZH || "N/A"}</td>
                                <td>{item.brand || "N/A"}</td>
                                <td>{item.groupId || "N/A"}</td>
                                <td style={{ minWidth: 500 }}>{item.uModelName || "N/A"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default MeeshoXL;

