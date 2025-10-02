import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AddNewBackModelLogic from "./AddNewBackModelLogic";

const AddNewBackModel = ({ initialData }) => {

    const { formData, handleChange, handleFileChange, handleSubmit, boxList, coverList } = AddNewBackModelLogic(initialData)

    return (
        <div>
            <h1 className="h2 border-bottom pb-2">{initialData != undefined ? "Edit Back" : "Add New Back"} Model</h1>
            <Container className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Box no</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="boxNo"
                                    value={formData.boxNo}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Select Box number</option>
                                    {boxList.map((box, index) => (
                                        <option key={index} value={box.boxNumber}>
                                            {box.boxNumber}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Cover Name</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="coverName"
                                    value={formData.coverName}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Select Cover Name</option>
                                    {coverList.map((cover, index) => (
                                        <option key={index} value={cover.coverName+' '+'9'}>
                                            {cover.coverName+' '+'9'}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group style={{display:"none"}}>
                                <Form.Label>Plain</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="selectStyle"
                                    value={formData.selectStyle}
                                    onChange={handleChange}
                                    //required
                                >
                                    <option>Plain</option>
                                    <option>Curve</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group style={{display:"none"}}>
                                <Form.Label>Select Size</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="selectSize"
                                    value={formData.selectSize}
                                    onChange={handleChange}
                                    //required
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
                                <Form.Label>Shopsy Designed For Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Shopsy Designed For Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Meesho Compatible Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    placeholder="Enter pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            {[...Array(3)].map((_, index) => (
                                <Form.Group key={index}>
                                    <Form.Label>Watermark {index + 1}</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id={`Watermark${index + 1}`}
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                </Form.Group>
                            ))}
                            {[...Array(3)].map((_, index) => (
                                <Form.Group key={index}>
                                    <Form.Label>Watermark {index + 4}</Form.Label>
                                    <Form.Control
                                        type="file"
                                        disabled={true}
                                        id={`Watermark${index + 4}`}
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

export default AddNewBackModel;
