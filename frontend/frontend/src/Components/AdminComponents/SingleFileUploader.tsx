import React, { useState } from "react";
import useAuth from "../useAuth";
import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:3000/images/fileupload';

const SingleFileUploader = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

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
        </section>
      )}

      {file && <button onClick={handleUpload}>Kép feltöltése</button>}
    </>
  );
};

export default SingleFileUploader;
