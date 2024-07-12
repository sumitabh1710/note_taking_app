import React, { useEffect, useState } from "react";
import "./NotesList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  pinNote,
  selectNotes,
} from "../../features/notes/notesSlice";
import deleteIcon from "../../assets/icon/delete_icon.svg";
import paintIcon from "../../assets/icon/paint_icon.svg";
import { Note } from "../../features/notes/NoteType";
import Popup from "../Popup/Popup";

const NotesList = () => {
  const notes = useSelector(selectNotes);
  const [others, setOthers] = useState<Array<Note>>([]);
  const [pinned, setPinned] = useState<Array<Note>>([]);
  const [showBgColor, setShowBgColor] = useState<String>("");
  const [bgColor, setBgColor] = useState<String>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const pinned = notes.filter((note) => note.pinned);
    const others = notes.filter((note) => !note.pinned);
    setPinned(pinned);
    setOthers(others);
  }, [notes]);

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  const handleTogglePinned = (id: string) => {
    dispatch(pinNote(id));
  };

  return (
    <div className="notes_lists_main_container">
      {pinned.length != 0 && (
        <div className="title">
          <h1>Pinned</h1>
          <div className="others_main_container">
            {pinned.map((each) => (
              <div
                key={each.id}
                className="each_note"
                style={{ backgroundColor: each.backgroundColor }}
              >
                <div
                  className="pinned_button"
                  onClick={() => handleTogglePinned(each.id)}
                >
                  <svg
                    fill={!each.pinned ? "#ffffff89" : "#fff"}
                    width="15px"
                    height="15px"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M573 834L166 427q-7-7-6.5-17.5T168 393q35-27 78.5-24.5T321 402l277 276q31 32 34 75.5T607 832q-6 8-16 8.5t-18-6.5zm103-185l204-263 5 5q6 7 16 7t17-7l18-18q7-7 7-17t-7-17L661 64q-7-7-17-7t-17 7l-18 18q-7 7-7 17t7 16l5 5-263 204q-9 6-9.5 17t6.5 18l293 293q7 7 18 6.5t17-9.5zM77 923l20-97 199-199 77 77-199 199z" />
                  </svg>
                </div>
                <h3>{each.title}</h3>
                <p>{each.content}</p>
                {each.image && (
                  <img
                    style={{ padding: "5px 0px" }}
                    width="100%"
                    height="auto"
                    src={each.image}
                    alt="Note"
                  />
                )}
                <div className="delete_image_button">
                  <div
                    className="delete_button"
                    onClick={() => {
                      if (showBgColor === each.id) {
                        setShowBgColor("");
                      } else {
                        setShowBgColor(each.id);
                      }
                    }}
                  >
                    <img src={paintIcon} width="20px"></img>
                    {showBgColor === each.id && <Popup noteId={each.id} />}
                  </div>
                  <div
                    className="delete_button"
                    onClick={() => handleDeleteNote(each.id)}
                  >
                    <img src={deleteIcon} width="18px"></img>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {others.length != 0 && (
        <div className="title">
          <h1>Others</h1>
          <div className="others_main_container">
            {others.map((each) => (
              <div
                key={each.id}
                className="each_note"
                style={{ backgroundColor: each.backgroundColor }}
              >
                <div
                  className="pinned_button"
                  onClick={() => handleTogglePinned(each.id)}
                >
                  <svg
                    fill={!each.pinned ? "#ffffff89" : "#fff"}
                    width="15px"
                    height="15px"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M573 834L166 427q-7-7-6.5-17.5T168 393q35-27 78.5-24.5T321 402l277 276q31 32 34 75.5T607 832q-6 8-16 8.5t-18-6.5zm103-185l204-263 5 5q6 7 16 7t17-7l18-18q7-7 7-17t-7-17L661 64q-7-7-17-7t-17 7l-18 18q-7 7-7 17t7 16l5 5-263 204q-9 6-9.5 17t6.5 18l293 293q7 7 18 6.5t17-9.5zM77 923l20-97 199-199 77 77-199 199z" />
                  </svg>
                </div>
                <h3>{each.title}</h3>
                <p>{each.content}</p>
                {each.image && (
                  <img
                    style={{ padding: "5px 0px" }}
                    width="100%"
                    height="auto"
                    src={each.image}
                    alt="Note"
                  />
                )}
                <div className="delete_image_button">
                  <div
                    className="delete_button"
                    onClick={() => {
                      if (showBgColor === each.id) {
                        setShowBgColor("");
                      } else {
                        setShowBgColor(each.id);
                      }
                    }}
                  >
                    <img src={paintIcon} width="20px"></img>
                    {showBgColor === each.id && <Popup noteId={each.id} />}
                  </div>
                  <div
                    className="delete_button"
                    onClick={() => handleDeleteNote(each.id)}
                  >
                    <img src={deleteIcon} width="18px"></img>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
