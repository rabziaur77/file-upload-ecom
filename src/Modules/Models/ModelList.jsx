import React from "react";
import { Table, Container } from "react-bootstrap";

const ModelList = ({ models }) => {
    return (
        <div>
            <h1 className="h2 border-bottom pb-2">Add New Model</h1>

            <Container className="mt-3">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Model Name</th>
                            <th>SKU Model Name</th>
                            <th>Box No</th>
                            <th>Software Version</th>
                            <th>Style</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models?.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No models saved yet
                                </td>
                            </tr>
                        ) : (
                            models?.map((model, index) => (
                                <tr key={index}>
                                    <td>{model.modelName}</td>
                                    <td>{model.skuModelName}</td>
                                    <td>{model.boxNo}</td>
                                    <td>{model.softwareVersion}</td>
                                    <td>{model.selectStyle}</td>
                                    <td>{model.selectSize}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ModelList;
