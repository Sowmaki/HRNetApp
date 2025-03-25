import { Link } from "react-router";
import "./Modal.scss";

export const Modal = ({ setOpenModal }) => {
  return (
    <div id="confirmation" class="modal">
      <h2 className="modal__title">Employee Created!</h2>
      <div className="modal__buttons">
        <button className="modal__buttons__closeBtn" onClick={() => setOpenModal(false)}>OK</button>
        <Link to={"/employee-list"}>
          <button className="modal__buttons__navigateBtn">Voir la liste</button>
        </Link>
      </div>
    </div>
  )
}