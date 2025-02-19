import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const CoverContent = () => {
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
      <h1 className="h2 border-bottom pb-2">Add New Cover</h1>
      <Container className="mt-3">
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Initial:</Form.Label>
                <Form.Control type="text" className="mb-2" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Cover Name:</Form.Label>
                <Form.Control type="text" className="mb-2" />
              </Form.Group>

              <Row>
                <Col>
                  {["Type", "Material", "Brand Color", "Features"].map(
                    (label) => (
                      <Form.Group key={label}>
                        <Form.Label>{label}:</Form.Label>
                        <Form.Control as="select" className="mb-2">
                          <option>Select {label}</option>
                        </Form.Control>
                      </Form.Group>
                    )
                  )}
                </Col>
                <Col>
                  {["Theme", "Color", "Suitable Device", "Inside Pack"].map(
                    (label) => (
                      <Form.Group key={label}>
                        <Form.Label>{label}:</Form.Label>
                        <Form.Control as="select" className="mb-2">
                          <option>Select {label}</option>
                        </Form.Control>
                      </Form.Group>
                    )
                  )}
                </Col>
              </Row>

              {[
                "Product Price",
                "Product Stock",
                "SKU Reference",
                "HSN Code",
                "Tax Code",
                "Weight",
                "Length",
                "Width",
                "Height",
                "Manufacturer Detail",
                "Packer",
                "Importer",
              ].map((label) => (
                <Form.Group key={label}>
                  <Form.Label>{label}:</Form.Label>
                  <Form.Control type="text" className="mb-2" />
                </Form.Group>
              ))}
              <Button type="submit" className="btn btn-custom mt-md-2">
                Save
              </Button>
            </Col>
            <Col md={6}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Form.Group key={index}>
                  <Form.Label>Cover {index + 1}:</Form.Label>
                  <Form.Control type="file" className="mb-2" />
                </Form.Group>
              ))}

              <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  className="mb-2"
                  defaultValue={"*ROYAL LOOK... Here we present..."}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Keywords:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue="Mobile Cover Flip wallet Back"
                  className="mb-2"
                />
              </Form.Group>

              {["Features1", "Features2", "Features3", "Features4"].map(
                (label) => (
                  <Form.Group key={label}>
                    <Form.Label>{label}:</Form.Label>
                    <Form.Control as="textarea" rows="2" className="mb-2" />
                  </Form.Group>
                )
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CoverContent;
