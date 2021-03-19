import React, { useState, useRef, useEffect } from 'react';

import './ImageUpload.css';

import Button from '../UI/Button';

export default function ImageUpload(props) {
  const { id, center } = props;

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageRef = useRef();

  const pichImageHandlder = () => {
    pickImageRef.current.click();
  };

  const pickHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];

      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className='form-control'>
      <input
        ref={pickImageRef}
        type='file'
        id={id}
        style={{ display: 'none' }}
        accept='.jpg, .png, .jpeg'
        onChange={pickHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button isGreen type='button' onClick={pichImageHandlder}>
          PICK MOVIE IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}
