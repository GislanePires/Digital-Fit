import React from 'react';

function CommaInput({ value, onChange }) {
    const handleChange = (e) => {
     if (e && e.target) {
       let newValue = e.target.value;
   
       // Remove qualquer vírgula existente
       newValue = newValue.replace(/,/g, '');
   
       // Insira a vírgula no local apropriado
       if (newValue.length > 2) {
         newValue = newValue.slice(0, -2) + ',' + newValue.slice(-2);
       }
   
       onChange(newValue);
     }
    };
   
    return <input value={value} onChange={handleChange} />;
   }
   
   export default CommaInput;
   