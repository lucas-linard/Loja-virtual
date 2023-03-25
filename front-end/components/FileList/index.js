import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = ({ files, onDelete }) => {
  console.log(files)
  return (
    
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{" "}
                <button onClick={() => onDelete(uploadedFile.id)}>
                  Excluir
                </button>
              </span>
            </div>
          </FileInfo>

          <div>
            <MdCheckCircle size={24} color="#78e5d5" />
          </div>
        </li>
      ))}
    </Container>
  )
};

export default FileList;
