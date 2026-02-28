import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      className="
        flex items-center gap-2
        mt-2
        px-4 py-2
        rounded-xl
        bg-red-500/10
        border border-red-500/30
        text-red-600
        text-sm
        animate-fadeIn
      "
    >
     <FontAwesomeIcon
  icon={faCircleExclamation}
  className="text-red-500 shrink-0"
/>

      <span>{message}</span>
    </div>
  );
}