// MonInput.js

import React, { useState } from 'react';

import './App.css'

function Name_input() {
    const [texte, setTexte] = useState('');

    const handleChange = (e) => {
        setTexte(e.target.value);
    }

    return (
        <div className='name_box'>
              <label className='name_label'>
          Nom sur la carte
        </label>
            <input 
                type="text" 
                value={texte} 
                onChange={handleChange} 
                placeholder="Nom"
            />
        </div>
    );
}

export default Name_input;
