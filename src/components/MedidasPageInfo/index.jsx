import React, { useState } from 'react';
import './style.scss';


const MedidasPageInfo = ( {children} ) => {
  // const [imc, setImc] = useState();
  return (
    <div className="medidas-page-info">
      {children}      
    </div>
  );
};

export default MedidasPageInfo;
