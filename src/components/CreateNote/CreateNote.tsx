import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./CreateNote.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addNote } from "../../features/notes/notesSlice";
import { Note } from "../../features/notes/NoteType";
import imageUpload from "../../assets/icon/image_upload_icon.svg";

const CreateNote = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const dispatch = useDispatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  const handleAddNote = () => {
    if (content.trim()) {
      const newNote: Note = {
        id: uuidv4(),
        title,
        content,
        pinned: false,
        backgroundColor,
        image,
      };
      dispatch(addNote(newNote));
    }
  };

  const handleCloseNoteButton = () => {
    if (content != "") {
      handleAddNote();
    }
    setTitle("");
    setContent("");
    setBackgroundColor("");
    setImage(undefined);
    setIsExpanded(false);
  };

  return (
    <div
      className={`create_note_container ${isExpanded ? "expanded" : ""}`}
      onClick={() => {
        setIsExpanded(true);
      }}
    >
      {isExpanded && (
        <div className="title_pinned_continer">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <div className="pinned_container"></div>
        </div>
      )}
      <div className="take_note_continer">
        <textarea
          className="take_note_input"
          onChange={(e) => {
            setContent(e.target.value);
            adjustTextareaHeight();
          }}
          onFocus={() => setIsExpanded(true)}
          ref={textareaRef}
          rows={1}
          value={content}
          placeholder="take_note"
        ></textarea>
      </div>
      {image && (
        <div>
          <img className="image_container" src={image} alt="Selected" />
        </div>
      )}
      {isExpanded && (
        <div
          className="upload_close_container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="image_upload_button">
            <img
              src={imageUpload}
              onClick={handleImageClick}
              width="20px"
            ></img>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="close_button" onClick={handleCloseNoteButton}>
            Close
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNote;
