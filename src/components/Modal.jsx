import React, { useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen}>Add trip</button>
      {isOpen && (
        <div>
          <form action="">
            <input type="text" name="country" />
            <input type="date" name="date-arrival" />
            <input type="date" name="date-depature" />
            <button>add trip</button>
          </form>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  )
}

export default Modal;