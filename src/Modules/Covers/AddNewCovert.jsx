import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import CoverContentLogic from "./CoverContentLogic";
import DropDownSelectList from "./CoverDropdownData";

const CoverContent = ({ initialData }) => {
  const { formData, handleChange, handleFileChange, handleSubmit } = CoverContentLogic(initialData);

  return (
    <div>
      <h1 className="h2 border-bottom pb-2">{initialData != undefined ? "Edit" : "Add New"} Cover</h1>
      <Container className="mt-3">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Group Name:</Form.Label>
                <Form.Control type="text" name="groupName" value={formData.groupName} onChange={handleChange} className="mb-2" required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Initial:</Form.Label>
                <Form.Control type="text" name="initial" value={formData.initial} onChange={handleChange} className="mb-2" required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Cover Name:</Form.Label>
                <Form.Control type="text" name="coverName" value={formData.coverName} onChange={handleChange} className="mb-2" required />
              </Form.Group>

              <Row>
                <Col>
                  {["Types", "Materials", "BrandColors", "Features"].map((label) => (
                    <Form.Group key={label}>
                      <Form.Label>{label}:</Form.Label>
                      <Form.Control as="select" name={label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, "")} 
                      value={formData[label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, "")] || ""} onChange={handleChange} className="mb-2" required>
                        {DropDownSelectList[label]?.map((val) => (
                          <option key={val.value} value={val.value}>
                            {val.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  ))}
                </Col>
                <Col>
                  {["Themes", "Colors", "Devices", "InsidePacks"].map((label) => (
                    <Form.Group key={label}>
                      <Form.Label>{label}:</Form.Label>
                      <Form.Control as="select" name={label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, "")} 
                      value={formData[label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, "")] || ""} onChange={handleChange} className="mb-2" required>
                        {DropDownSelectList[label]?.map((val) => (
                          <option key={val.value} value={val.value}>
                            {val.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  ))}
                </Col>
              </Row>

              {/* Numeric and Text Fields from the Image */}
              <Row>
                <Col>
                  {[
                    "Product Price", "Product Stock", "Sku Reference", "Hsn Code", "Tax Code",
                    "Weight", "Width", "Height", "Length", "Packer", "Importer", "Manufacturer Detail",
                    "Flipkart Price", "Shopsy Price", "Meesho Price"
                  ].map((label) => (
                    <Form.Group key={label}>
                      <Form.Label>{label}:</Form.Label>
                      <Form.Control
                        type="text"
                        name={label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, "")}
                        value={formData[label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, "")] || ""}
                        onChange={handleChange}
                        className="mb-2"
                        required
                      />
                    </Form.Group>
                  ))}
                </Col>
                <Col>
                  {["MRP", "Tax Rate", "Weight Flipkart In Kg", "Weight Meesho In Grams", "QTY",
                    "Sales QTY", "Country Of Origin", "Type", "X1", "X2", "X3", "X4", "X5", "X6", "X7",
                    "X8", "X9", "X10", "X11", "X12", "X13", "X14", "X15", "X16", "X17", 
                    "X18", "X19", "X20", "X21", "X22", "X23", "X24", "X25"
                  ].map((label) => (
                    <Form.Group key={label}>
                      <Form.Label>{label}:</Form.Label>
                      <Form.Control
                        type="text"
                        name={label.includes(" ") ?label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, ""):label.toLowerCase()}
                        value={formData[label.includes(" ") ? label.charAt(0).toLowerCase() + label.slice(1).replace(/\s/g, "") : label.toLowerCase().replace(/\s/g, "")] || ""}
                        onChange={handleChange}
                        className="mb-2"
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

            </Col>

            <Col md={6}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Form.Group key={index}>
                  <Form.Label>Cover {index + 1}:</Form.Label>
                  <Form.Control type="file" id={`cover${index + 1}`} name={`cover${index + 1}`} onChange={(e) => handleFileChange(e, index)} className="mb-2" />
                </Form.Group>
              ))}

              <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" name="description" rows="4" value={formData.description} onChange={handleChange} className="mb-2" required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Keywords:</Form.Label>
                <Form.Control type="text" name="keywords" value={formData.keywords} onChange={handleChange} className="mb-2" />
              </Form.Group>

              {["Features1", "Features2", "Features3", "Features4"].map((label) => (
                <Form.Group key={label}>
                  <Form.Label>{label}:</Form.Label>
                  <Form.Control as="textarea" name={label.toLowerCase()} rows="2" value={formData[label.toLowerCase()]} onChange={handleChange} className="mb-2" />
                </Form.Group>
              ))}
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CoverContent;
