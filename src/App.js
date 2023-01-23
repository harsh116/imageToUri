// import logo from "./logo.svg";
import { useState, useEffect, useRef } from "react";
import "./App.css";

import Zoom from './Zoom'



function App() {
   const [src, setSrc] = useState("");
  const [uri, setUri] = useState("");

  const [zoomState,setZoomState]=useState(50)

  const createImage = () => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;

      image.onload = () => {
        resolve(image);
      };

      image.onerror = (e) => {
        reject(e);
      };
    });
  };

  useEffect(async () => {
    // const image = new Image();
    // image.crossOrigin = "anonymous";
    // image.src = src;

    // image.onload = () => {
    const image = await createImage();
    const canvas = document.createElement("canvas");
    canvas.width = image.width;

    canvas.height = image.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    setUri(dataURL);
    // console.log(dataURL);
    // };
  }, [src]);

  const handleChange = (e) => {
    setSrc(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uri).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const uploadImage = () => {
    const fileElement = document.createElement("input");
    fileElement.setAttribute("type", "file");
    fileElement.setAttribute("accept", "image/*");
    fileElement.click();

    fileElement.onchange = (e) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileElement.files[0]);

      reader.onload = () => {
        setSrc(reader.result);
      };
    };
  };

  return (
    <div>
      <div className="mainSection">
      <Zoom setZoomState={setZoomState} zoomState={zoomState}/>
        <div className="inputs">
          <input
            type="text"
            placeholder="Insert the url of image"
            onChange={handleChange}
          />
          <div className="or">OR</div>
          <div className="uploadImageSection">
            <button className="uploadImage" onClick={uploadImage}>
              Upload Image
            </button>
          </div>
        </div>
        <br />

        <div className="base64Section">
          <div className="base64URI">{uri.substr(0, 100)}</div>
          <button
            onClick={copyToClipboard}
            title="Copy data URI"
            className="copyToClipboard"
          >
            <i class="fa fa-copy"></i>
          </button>
        </div>

        {src ? <img style={{width: `${zoomState}%`}} src={src} alt="image" /> : ""}
      </div>
    </div>
  );}

export default App;
