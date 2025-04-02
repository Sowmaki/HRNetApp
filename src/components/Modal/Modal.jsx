import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Modal.scss";

export const Modal = ({ setOpenModal }) => {
  const navigate = useNavigate()

  useEffect(() => {
    // Ferme la modale avec "Échap"
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };

    // Bloque le scroll arrière-plan quand modale ouverte
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restaure le scroll à la fermeture
      document.body.style.overflow = "auto";
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
          <button className="modal__buttons__navigateBtn button" onClick={() => navigate('/')}>View List</button>
        </div>
      </div>
    </div>
  )
}