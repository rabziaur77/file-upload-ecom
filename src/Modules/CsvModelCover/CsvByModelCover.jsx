import React, { useState } from "react";
import '../Models/modelStyle.css'
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Dropdown,
    DropdownButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CsvByModelCoverLogic from "./CsvByModelCoverLogic";

const CsvByModel = () => {
    const { models, covers, brandCoverFlip,
        handleCoverChange, handleSelectAll,
        selectAll, selectedCovers, brand,
        handleChange, elementModel, manufacturer, clickForEcom, btnList
    } = CsvByModelCoverLogic();

    return (
        <div>
            <h1 className="h2 border-bottom pb-2">Csv By Model</h1>
            <Container className="mt-3">
                {/* Select Model Dropdown */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="selectModel">
                            <Form.Label>Select Model <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="select" name="selectedModel" onChange={handleChange} required>
                                <option>Select Model</option>
                                {
                                    models.map((model, index) =>
                                        <option key={index} value={model.modelName}>{model.modelName}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Select Covers */}
                <Row className="mb-3">
                    <Col>
                        <label className="cover-label">
                            Select Covers <span className="text-danger">*</span>:
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </label>
                    </Col>
                </Row>

                {/* Cover Selection Grid */}
                <Row className="selection-cover">
                    {covers.map((cover) => (
                        <Col key={cover.coverName} xs={3} className="mb-2">
                            <label className="cover-label">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    checked={selectedCovers[cover.coverName] || false}
                                    onChange={() => handleCoverChange(cover.coverName)}
                                />
                                {cover.coverName}
                            </label>
                        </Col>
                    ))}
                </Row>

                {/* Select Brand */}
                <Row className="mt-3">
                    <Col>
                        <Form.Group controlId="selectBrand">
                            <Form.Label>Select Brand Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="select" name="selectBrand" onChange={handleChange}>
                                <option>Select Brand Name</option>
                                {
                                    brand.map((man) =>
                                        <option key={man} value={man}>{man}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Platform Buttons */}
                <Row className="mt-3">
                    <Col className="d-flex gap-2">
                        {btnList.map((platform) => (
                            <Button key={platform} className="btn btn-custom mt-md-2" onClick={(e)=>clickForEcom(platform)}>
                                {platform}
                            </Button>
                        ))}
                    </Col>
                </Row>

                {/* Manufacturer Dropdown */}

                <Row className="mt-3" style={{ display: 'none' }}>
                    <Col className="d-flex gap-2">
                        {brandCoverFlip.map((flp) => (
                            <label key={flp} className="cover-label">
                                <input
                                    type="checkbox"
                                    onChange={() => toggleCover(flp)}
                                    className="custom-checkbox"
                                />
                                {flp}
                            </label>
                        ))}
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="d-flex gap-2">
                        <Form.Control as="select" 
                        name="selectedManufacture" 
                        value={elementModel.selectedManufacture}
                        onChange={handleChange}>
                            <option>Select Manufacturer</option>
                            {
                                manufacturer.map((man) =>
                                    <option key={man} value={man}>{man}</option>)
                            }
                        </Form.Control><span className="text-danger">*</span>
                    </Col>
                    <Col className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Manufacturer"
                            defaultValue={elementModel.selectedManufacture??""}
                        >
                        </Form.Control>
                    </Col>
                    <Col className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Model From Mesho Model list"
                        >
                        </Form.Control>
                    </Col>
                    <Col className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Brand"
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            name="company"
                            placeholder="For Mesho Company"
                            value={elementModel.company}
                            onChange={handleChange}
                        >
                        </Form.Control>
                    </Col>
                    <Col className="d-flex gap-2">
                        <Form.Control
                            name="address"
                            type="text"
                            placeholder="For Mesho Address"
                            value={elementModel.address}
                            onChange={handleChange}
                        >
                        </Form.Control>
                    </Col>
                    <Col className="d-flex gap-2">
                        <Form.Control
                            name="pincode"
                            type="text"
                            placeholder="For Mesho Pincode"
                            value={elementModel.pincode}
                            onChange={handleChange}
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="d-flex gap-2">
                        <Form.Control as="textarea" rows="2" className="mb-2" style={{ display: 'none' }}
                            placeholder="Additional Description"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CsvByModel;
