import React, { useState } from "react";
import useAuth from "../useAuth";
import { useNavigate } from "react-router-dom";
import { GLOBAL_API_URL } from "../../GLOBAL_API_URL";

const API_URL = GLOBAL_API_URL + '/images/fileupload';

const SingleFileUploader = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState('zsele'); //fieldname of the file for transfer

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const isValidFileUploaded=(file : File)=>{
      const validExtensions = ['png','jpeg','jpg']
      const fileExtension = file.type.split('/')[1]
      return validExtensions.includes(fileExtension)
    }

    const handleUpload = async () => {
        if (file) {
            try {
             
                const formData = new FormData();
                formData.append(type, file);

                const fileForValidation = file;
                if(!isValidFileUploaded(fileForValidation)){
                  window.alert("Hibás fájlformátum! Kérem válasszon png, jpeg vagy jpg formátumú fájlt!");
                  return;
                }

                const result = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (result.ok) {
                    console.log("Upload successful");
                    navigate(0);
                    setFile(null);
                }
            } catch (error) {
                console.error("Upload failed", error);
            }
        }
  };

  return (
    <>
          <div>
    <h2>
        Kép feltöltése
    </h2>

        <label htmlFor="file" className="sr-only">
          Válasszon képet
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          Fájl adatok:
          <ul>
            <li>Név: {file.name}</li>
            <li>Típus: {file.type}</li>
            <li>Méret: {file.size} bytes</li>
          </ul>
          <label className="">Típus:
          <select name="type" id="" className="form-select" onChange={(e) => setType(e.currentTarget.value)}>
            <option value="zsele">Zselé</option>
            <option value="gellakk">Géllakk</option>
            <option value="porcelan">Porcelán</option>
            <option value="manikur">Manikűr</option>
          </select>
          </label>
        </section>
      )}

      {file && <button onClick={handleUpload}>Kép feltöltése</button>}
    </>
  );
};

export default SingleFileUploader;
