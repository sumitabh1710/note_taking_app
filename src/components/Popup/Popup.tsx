import React from "react";
import "./Popup.css";
import { useDispatch } from "react-redux";
import { setNoteBackgroundColor } from "../../features/notes/notesSlice";

interface PopupProps {
  noteId: string;
}

const Popup: React.FC<PopupProps> = ({ noteId }) => {
  const colorOptions = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF2",
    "#F2FF33",
    "#A133FF",
  ];

  const dispatch = useDispatch();

  const handleColorChange = (color: string) => {
    dispatch(setNoteBackgroundColor({ id: noteId, backgroundColor: color }));
  };

  return (
    <div className="popup_main_container">
      {colorOptions.map((each) => (
        <div
          className="bg_color_options"
          style={{ backgroundColor: each }}
          onClick={() => {
            handleColorChange(each);
          }}
        ></div>
      ))}
    </div>
  );
};

export default Popup;
