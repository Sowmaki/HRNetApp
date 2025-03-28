import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Modal.scss";

export const Modal = ({ setOpenModal }) => {
  const navigate = useNavigate()

  // Ferme la modale avec "Échap"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };

    document.body.style.overflow = "hidden"; // Bloque le scroll arrière-plan
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto"; // Restaure le scroll
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpenModal]);

  return (
    // Ferme la modale si on clique en dehors
    <div className="modal-overlay" onClick={() => setOpenModal(false)}>
      <div id="confirmation" className="modal">
        <h2 className="modal__title">Employee Created!</h2>
        <div className="modal__buttons">
          {/* Ajoute un bouton pour fermer la modale */}
          <button className="modal__buttons__closeBtn button" onClick={() => setOpenModal(false)}>OK</button>
          {/* Bonus: Ajoute un bouton pour voir la liste des employés */}
          <button className="modal__buttons__navigateBtn button" onClick={() => navigate('/employee-list')}>View List</button>
        </div>
      </div>
    </div>
  )
}