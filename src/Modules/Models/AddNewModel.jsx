import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MobileModelLogic from "./AddNewModelLogic";

const MainContent = ({ initialData }) => {

    const { formData, handleChange, handleFileChange, handleSubmit } = MobileModelLogic(initialData)

    return (
        <div>
            <h1 className="h2 border-bottom pb-2">{initialData != undefined ? "Edit" : "Add New"} Model</h1>
            <Container className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Model Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="modelName"
                                    placeholder="Enter model name"
                                    value={formData.modelName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>SKU Model Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="skuModelName"
                                    placeholder="Enter SKU model name"
                                    value={formData.skuModelName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Box No.</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="boxNo"
                                    placeholder="Enter box number"
                                    value={formData.boxNo}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Software Version</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="softwareVersion"
                                    placeholder="Enter software version"
                                    value={formData.softwareVersion}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Plain</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="selectStyle"
                                    value={formData.selectStyle}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Plain</option>
                                    <option>Curve</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select Size</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="selectSize"
                                    value={formData.selectSize}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Size</option>
                                    <option value="M">M</option>
                                    <option value="XL">XL</option>
                                    <option value="5.3">5.3</option>
                                    <option value="5.7">5.7</option>
                                    <option value="5.9">5.9</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    placeholder="Enter pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            {[...Array(6)].map((_, index) => (
                                <Form.Group key={index}>
                                    <Form.Label>Watermark {index + 1}</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id={`Watermark${index + 1}`}
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                </Form.Group>
                            ))}
                        </Col>
                    </Row>
                    {initialData === undefined ?
                        <Button type="submit" className="btn btn-custom mt-md-2">
                            Save
                        </Button> : 
                        <Button type="submit" className="btn btn-custom mt-md-2">
                            Update
                        </Button>}

                </Form>
            </Container>
        </div>
    );
};

export default MainContent;
