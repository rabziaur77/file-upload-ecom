import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const MainContent = () => {
    const [formData, setFormData] = useState({
        modelName: "",
        skuModelName: "",
        boxNo: "",
        softwareVersion: "",
        selectStyle: "Plain",
        selectSize: "Small",
        watermarks: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e, index) => {
        const files = [...formData.watermarks];
        files[index] = e.target.files[0];
        setFormData({ ...formData, watermarks: files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div>
            <h1 className="h2 border-bottom pb-2">Add New Model</h1>
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
                                    required
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
                        </Col>
                        <Col md={6}>
                            {[...Array(6)].map((_, index) => (
                                <Form.Group key={index}>
                                    <Form.Label>Watermark {index + 1}</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                </Form.Group>
                            ))}
                        </Col>
                    </Row>
                    <Button type="submit" className="btn btn-custom mt-md-2">
                        Save
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default MainContent;
