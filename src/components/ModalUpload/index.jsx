import React, { useState } from 'react';
import "./style.scss";

const ModalUpload = ({ isOpen, onClose }) => {
  const [images, setImages] = useState([]);
  const deleteImage = index => {
    setImages(images.filter((image, i) => i !== index));
  };

  const handleImageUpload = event => {
    const fileArray = Array.from(event.target.files);
    if (fileArray.length + images.length > 4) {
      alert('Você já atingiu a quantidade máxima de imagens');
      return;
    }
  
    const imagePromises = fileArray.map(file => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 300;
          const scaleFactor = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleFactor;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(blob => {
            resolve(new File([blob], file.name, {type: file.type}));
          }, file.type);
        };
        img.onerror = reject;
      });
    });
  
    Promise.all(imagePromises)
      .then(newImages => {
        setImages(prevImages => [...prevImages, ...newImages]);
      })
      .catch(console.error);
  };
  
  

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="buttons-close-ficheiro">

        <button className="button-modal-close" onClick={onClose}>Close</button>
        <input className="input-ficheiro" type="file" accept="image/*" multiple onChange={handleImageUpload} />
        </div>
        
        {images.map((image, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(image)} alt={`Upload ${index}`} />
            <button className="button-modal-delete" onClick={() => deleteImage(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalUpload;

