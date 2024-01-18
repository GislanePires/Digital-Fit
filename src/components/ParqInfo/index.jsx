import React, {useState} from 'react';
import './style.scss';

const ParqInfo = ({parq}) => {
    return(
        <ul className="parq-results">
            <li className="parq-result-item">Coração: {parq?.coracao}</li>
            <li className="parq-result-item">Dores no peito: {parq?.doresNoPeito}</li>
            <li className="parq-result-item">Desequilíbrio: {parq?.desiquilibrio}</li>
            <li className="parq-result-item">Último mês: {parq?.ultimoMes}</li>
            <li className="parq-result-item">Ósseo: {parq?.osseo}</li>
            <li className="parq-result-item">Pressão: {parq?.pressao}</li>
            <li className="parq-result-item">Outra razão: {parq?.outraRazao}</li>
            <li className="parq-result-item">Assinatura: {parq?.assinatura}</li>
          </ul>
        
    );
};
export default ParqInfo;