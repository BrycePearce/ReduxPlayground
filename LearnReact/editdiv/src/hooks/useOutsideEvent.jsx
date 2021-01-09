import { useEffect } from "react";

const useOutsideEvent = (ref, shouldTriggerEvent, callback) => {
  useEffect(() => {
    if (shouldTriggerEvent) {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, callback, shouldTriggerEvent]);
};

export default useOutsideEvent;
