import "./FullPoster.css";

export default function FullPoster({ poster, onClose }) {
    // Ici je fais en sorte que la modale ne s'ouvre que si poster est non null
  if (!poster) return null;

  return (
    <div
      id="full-poster-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <img
        id="full-poster-modal-img"
        src={poster}
        alt="Affiche en grand"
      />
    </div>
  );
}