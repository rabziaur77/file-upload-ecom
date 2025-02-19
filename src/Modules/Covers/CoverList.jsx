import React from "react";
import { Table, Container } from "react-bootstrap";

const CoverList = ({ models }) => {
    return (
        <div>
            <h1 className="h2 border-bottom pb-2">Add New Model</h1>

            <Container className="mt-3">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Material</th>
                            <th>Suitable Device</th>
                            <th>C1-2</th>
                            <th>C3-4</th>
                            <th>C5-6</th>
                            <th>Manage</th>
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
                                    <td>{model.name}</td>
                                    <td>{model.material}</td>
                                    <td>{model.device}</td>
                                    <td>{model.c12}</td>
                                    <td>{model.c34}</td>
                                    <td>{model.c56}</td>
                                    <td>
                                        <div>
                                            <input type="checkbox" />ON or OFF
                                            <a href="#">Edit</a>
                                            <a href="#">Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default CoverList;
