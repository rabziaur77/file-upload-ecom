import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideConfirm } from "../../redux/confirmSlice";

const ConfirmPopup = ({ messages, onConfirm }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const cancelConfirm = () => {
    dispatch(hideConfirm());
  };
  const confirmed = () => {
    if (onConfirm) {
      onConfirm(password);
    }
  };

  return (
    <div className="popup">
      <div className="confirm-Body">
        <div className="confirm-closeOpt">
          <button onClick={cancelConfirm}>x</button>
        </div>
        <div className="confirm-message">{messages}</div>
        <div className="confirm-message">
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm with your password"
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={confirmed}>
              Confirm
            </button>
            <button className="btn btn-secondary" onClick={cancelConfirm}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
