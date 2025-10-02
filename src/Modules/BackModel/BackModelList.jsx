import { Table, Container, Modal } from "react-bootstrap";
import BackModelListLogic from "./BackModelListLogic";
import '../Models/modelStyle.css'
import AddNewBackModel from "./AddNewBackModel";

const BackModelList = () => {

    const { models, handleEdit, handleDel, showModal, handleClose, selecteModel, handleToggleActive } = BackModelListLogic();

    return (
        <div>
            <h1 className="h2 border-bottom pb-2">Back Model List</h1>

            <Container className="mt-3">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>SKU</th>
                            <th>Box</th>
                            <th>Cover Name</th>
                            <th>Size</th>
                            <th>w1</th><th>w2</th><th>w3</th><th>w4</th><th>w5</th><th>w6</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models?.length === 0 ? (
                            <tr>
                                <td colSpan="15" className="text-center">
                                    No models saved yet
                                </td>
                            </tr>
                        ) : (
                            models?.map((model, index) => (
                                <tr key={index}>
                                    <td>{model.modelID}</td>
                                    <td>{model.modelName}</td>
                                    <td>{model.skuModelName}</td>
                                    <td>{model.boxNumber}</td>
                                    <td>{model.coverName}</td>
                                    <td>{model.size}</td>
                                    <td>{model.watermark1 != null ? <img className="img-size" src={model.watermark1} /> : null}</td>
                                    <td>{model.watermark2 != null ? <img className="img-size" src={model.watermark2} /> : null}</td>
                                    <td>{model.watermark3 != null ? <img className="img-size" src={model.watermark3} /> : null}</td>
                                    <td>{model.watermark4 != null ? <img className="img-size" src={model.watermark4} /> : null}</td>
                                    <td>{model.watermark5 != null ? <img className="img-size" src={model.watermark5} /> : null}</td>
                                    <td>{model.watermark6 != null ? <img className="img-size" src={model.watermark6} /> : null}</td>
                                    <td><button className="btn" onClick={() => handleEdit(model)}>&#128221;</button></td>
                                    <td><button className="btn" onClick={() => handleDel(model.modelID)}>&#128465;</button></td>
                                    <td><input type="checkbox" checked={model.isActive} onChange={() => handleToggleActive(model.modelID, model.isActive)} /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Container>

            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Model</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddNewBackModel initialData={selecteModel} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default BackModelList;