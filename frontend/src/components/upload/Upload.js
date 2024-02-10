import React, { useState, useRef, useEffect } from "react";
import "./Upload.css";
import { useHistory } from "react-router-dom";

const Upload = () => {
  const history = useHistory();
  const videoRef = useRef(null);
  const [output, setOutput] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      const constraints = { video: true };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, []);

  const sendFrameToBackend = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    
    // Send imageData to backend for processing
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ image: imageData }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch("http://localhost:8000/object-to-img", requestOptions);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setOutput(data.img);
      setName(data.result);
    } catch (error) {
      console.error("Error sending frame to backend:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendFrameToBackend();
    }, 100); // Adjust interval as needed for your application
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="full">
      <nav aria-label="breadcrumb" style={{ paddingLeft: "25px", paddingTop: "17px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item" onClick={() => history.push("/")}>
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Detect
          </li>
        </ol>
      </nav>
      <div className="containerofcomponents">
        <video ref={videoRef} autoPlay={true} />
        <div className="image">
        <div>
          <img className="rounded" src={output} alt="Processed Frame" />
        </div>
      </div>
      </div>
      <br />
      <br />
      
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h3 className="label" style={{ textAlign: "center" }}>
          {name}
        </h3>
      </div>
    </div>
  );
};

export default Upload;
