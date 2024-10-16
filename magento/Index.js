import React from 'react';
import index from './image/TigrenClothings.png';
import './Index.css';

const Index = () => {
    return (
        <div className="store-image-container">
            <img src={index} alt="Tigren Clothings" className="store-image" />
        </div>
    );
};

export default Index;
