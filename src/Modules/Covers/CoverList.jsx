import React from "react";
import { Table, Container, Modal } from "react-bootstrap";
import CoverListLogic from "./CoverListLogic";
import CoverContent from "./AddNewCovert";
import '../Models/modelStyle.css'

const CoverList = () => {

    const{covers,handleClose,handleDel,handleEdit,selecteCover,showCover} = CoverListLogic()

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
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {covers?.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No models saved yet
                                </td>
                            </tr>
                        ) : (
                            covers?.map((cover, index) => (
                                <tr key={index}>
                                    <td>
                                        <div><span className="name-group">{cover.groupName}</span>{cover.coverName}</div>
                                        <div><strong>Type: </strong>{cover.types}</div>
                                        <div><strong>Theme: </strong>{cover.themes}</div>
                                    </td>
                                    <td>
                                        <div>{cover.materials}</div>
                                        <div><strong>Color: </strong>{cover.colors}</div>
                                        <div><strong>BrandColor: </strong>{cover.brandColors}</div>
                                    </td>
                                    <td>
                                        <div>{cover.devices}</div>
                                        <div><strong>Features: </strong>{cover.features}</div>
                                        <div><strong>InsidePack: </strong>{cover.insidePacks}</div>
                                    </td>
                                    <td>
                                        <div>{cover.cover1 != null ? <img className="img-size" src={cover.cover1} /> : null}</div>
                                        <div>{cover.cover2 != null ? <img className="img-size" src={cover.cover2} /> : null}</div>
                                    </td>
                                    <td>
                                        <div>{cover.cover3 != null ? <img className="img-size" src={cover.cover3} /> : null}</div>
                                        <div>{cover.cover4 != null ? <img className="img-size" src={cover.cover4} /> : null}</div>
                                    </td>
                                    <td>
                                        <div>{cover.cover5 != null ? <img className="img-size" src={cover.cover5} /> : null}</div>
                                        <div>{cover.cover6 != null ? <img className="img-size" src={cover.cover6} /> : null}</div>
                                    </td>
                                    <td><button className="btn" onClick={() => handleEdit(cover)}>&#128221;</button></td>
                                    <td><button className="btn" onClick={() => handleDel(cover.id)}>&#128465;</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Container>

            <Modal show={showCover} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Cover</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CoverContent initialData={selecteCover}/>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default CoverList;
