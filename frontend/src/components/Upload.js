import React, { useState } from "react"
import './Upload.css'
import { useHistory } from "react-router-dom"

const Upload = () => {
  const history = useHistory()

  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState();
  const [output, setOutput] = useState();
  const [name, setName] = useState();
  const changeHandler = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData2 = new FormData();
    formData2.append(
      "file",
      selectedFile,
      selectedFile.name
    );

    const requestOptions = {
      method: 'POST',
      body: formData2
    };
    fetch('http://localhost:8000/object-to-img', requestOptions)
      .then(response => response.json())
      .then(function (response) {
        console.log('response')

        var encode_image = JSON.parse(response.img.body)['image'];
        setOutput('data:image/png;base64,' + encode_image);
        setName(response.result)
      });
  }
  return (<div className="full" >
    <nav aria-label="breadcrumb" style={{ paddingLeft: '25px', paddingTop: '17px' }}>
      <ol class="breadcrumb">
        <li class="breadcrumb-item" onClick={() => history.push("/")}><a href="#">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Detect</li>
      </ol>
    </nav>
    <div className="containerofcomponents">
      <form onSubmit={handleSubmit}>


        <div class="mb-3">
          <label for="formFile" class="form-label">Add Image</label>
          <div class="form-outline w-50">
            <fieldset>
              <input className="form-control" name="image" type="file" onChange={changeHandler} accept=".jpeg, .png, .jpg" />
            </fieldset>
          </div>

        </div>
        <button className="btn btn-primary btn-sm" type="submit" >detect</button>
      </form>
    </div>
    <br /><br />
    <div className="image">
      <div >
        <img className="rounded" src={file} width='450' />
      </div>
      <div>
        <img className="rounded" src={output} width='470' height="340" />
      </div>
    </div>
    <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
      <h3 className="label" style={{ textAlign: "center" }}>{name}</h3>
    </div>
  </div>

  );
}

export default Upload