import React, { useState } from "react";
import './modelStyle.css'
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

const covers = [
    "Coff + tan",
    "TT Brown",
    "Bk Tower",
    "Coff Butfly",
    "Rep3Coff",
    "Coffee logo",
    "Black Framee",
    "TB TAN BLACK",
    "BLUE SUN",
    "Black + Blue",
    "Check",
    "PINK SUN",
    "CC TAN BLACK",
];
const brandCoverFlip=[
    "By Brand",
    "Flip Cover",
    "Cover"
]
const CsvByModel = () => {
    const [selectedCovers, setSelectedCovers] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [filters, setFilters] = useState({
        byBrand: false,
        flipCover: false,
        cover: false,
    });

    const toggleCover = (cover) => {
        setSelectedCovers((prev) => {
            const newSelection = new Set(prev);
            if (newSelection.has(cover)) newSelection.delete(cover);
            else newSelection.add(cover);
            return newSelection;
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedCovers(new Set());
        } else {
            setSelectedCovers(new Set(covers));
        }
        setSelectAll(!selectAll);
    };

    return (
        <div>
            <h1 className="h2 border-bottom pb-2">Csv By Model</h1>
            <Container className="mt-3">
                {/* Select Model Dropdown */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="selectModel">
                            <Form.Label>Select Model</Form.Label>
                            <Form.Control as="select">
                                <option>Select Model</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Select Covers */}
                <Row className="mb-3">
                    <Col>
                        <label className="cover-label">
                            Select Covers:
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="custom-checkbox"
                            />
                        </label>
                    </Col>
                </Row>

                {/* Cover Selection Grid */}
                <Row>
                    {covers.map((cover) => (
                        <Col key={cover} xs={3} className="mb-2">
                            <label className="cover-label">
                                <input
                                    type="checkbox"
                                    checked={selectedCovers.has(cover)}
                                    onChange={() => toggleCover(cover)}
                                    className="custom-checkbox"
                                />
                                {cover}
                            </label>
                        </Col>
                    ))}
                </Row>

                {/* Select Brand */}
                <Row className="mt-3">
                    <Col>
                        <Form.Group controlId="selectBrand">
                            <Form.Label>Select Brand Name</Form.Label>
                            <Form.Control as="select">
                                <option>Select Brand Name</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Platform Buttons */}
                <Row className="mt-3">
                    <Col className="d-flex gap-2">
                        {["Flipkart", "Flipkart XL", "Meesho", "Meesho Excel", "Amazon"].map((platform) => (
                            <Button key={platform} className="btn btn-custom mt-md-2">
                                {platform}
                            </Button>
                        ))}
                    </Col>
                </Row>

                {/* Manufacturer Dropdown */}
                <Row className="mt-3">
                    <Col>
                        <Form.Group controlId="selectManufacturer">
                            <Form.Label>Select Manufacturer</Form.Label>
                            <Form.Control as="select">
                                <option>Select Manufacturer</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="d-flex gap-2">
                        {brandCoverFlip.map((flp) => (
                            <label className="cover-label">
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
                            <Form.Control as="select">
                                <option>Select Manufacturer</option>
                            </Form.Control>
                    </Col>
                    <Col className="d-flex gap-2">
                            <Form.Control
                            type="text"
                            placeholder="Manufacturer"
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
                    <Form.Control as="textarea" rows="2" className="mb-2" 
                    placeholder="Additional Description"
                    />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CsvByModel;
