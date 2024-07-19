"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useAuth_1 = require("../useAuth");
const react_router_dom_1 = require("react-router-dom");
const GLOBAL_API_URL_1 = require("../../../GLOBAL_API_URL");
const API_URL = GLOBAL_API_URL_1.GLOBAL_API_URL + '/images/fileupload';
const SingleFileUploader = () => {
    const { token } = (0, useAuth_1.default)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [file, setFile] = (0, react_1.useState)(null);
    const [typeofnail, setTypeofnail] = (0, react_1.useState)('zsele');
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const isValidFileUploaded = (file) => {
        const validExtensions = ['png', 'jpeg', 'jpg'];
        const fileExtension = file.type.split('/')[1];
        return validExtensions.includes(fileExtension);
    };
    const handleUpload = async () => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('typeofnail', typeofnail);
                const fileForValidation = file;
                if (!isValidFileUploaded(fileForValidation)) {
                    window.alert("Hibás fájlformátum! Kérem válasszon png, jpeg vagy jpg formátumú fájlt!");
                    return;
                }
                for (let key of formData.keys()) {
                    console.log(key);
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
            }
            catch (error) {
                console.error("Upload failed", error);
            }
        }
    };
    return (<>
          <div>
    <h2>
        Kép feltöltése
    </h2>

        <label htmlFor="file" className="sr-only">
          Válasszon képet
        </label>
        <input id="file" type="file" onChange={handleFileChange}/>
      </div>
      {file && (<section>
          Fájl adatok:
          <ul>
            <li>Név: {file.name}</li>
            <li>Típus: {file.type}</li>
            <li>Méret: {file.size} bytes</li>
          </ul>
          <label className="">Típus:
          <select name="type" id="" className="form-select" onChange={(e) => setTypeofnail(e.currentTarget.value)}>
            <option value="zsele">Zselé</option>
            <option value="gellakk">Géllakk</option>
            <option value="porcelan">Porcelán</option>
            <option value="manikur">Manikűr</option>
          </select>
          </label>
        </section>)}

      {file && <button onClick={handleUpload}>Kép feltöltése</button>}
    </>);
};
exports.default = SingleFileUploader;
//# sourceMappingURL=SingleFileUploader.js.map