import React, { useState } from 'react';

const WaveCustomizer = ({ onChange, layers, setLayers }) => {
    const [color, setColor] = useState('#00bfa5');
    const [gradient, setGradient] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [flip, setFlip] = useState(false);

    const handleColorChange = (e) => {
        setColor(e.target.value);
        onChange(layers, e.target.value, gradient, animate, flip);
    };

    const handleGradientChange = () => {
        setGradient(!gradient);
        onChange(layers, color, !gradient, animate, flip);
    };

    const handleAnimateChange = () => {
        setAnimate(!animate);
        onChange(layers, color, gradient, !animate, flip);
    };

    const handleFlipChange = () => {
        setFlip(!flip);
        onChange(layers, color, gradient, animate, !flip);
    };

    const addLayer = () => {
        setLayers((prev) => prev + 1);
        onChange(layers + 1, color, gradient, animate, flip);
    };

    const removeLayer = () => {
        if (layers > 1) {
            setLayers((prev) => prev - 1);
            onChange(layers - 1, color, gradient, animate, flip);
        }
    };

    return (
        <div className="customizer">
            <label>
                Wave Color:
                <input type="color" value={color} onChange={handleColorChange} />
            </label>
            <label>
                Gradient:
                <input type="checkbox" checked={gradient} onChange={handleGradientChange} />
            </label>
            <label>
                Animate:
                <input type="checkbox" checked={animate} onChange={handleAnimateChange} />
            </label>
            <label>
                Flip:
                <input type="checkbox" checked={flip} onChange={handleFlipChange} />
            </label>
            <div>
                <button onClick={addLayer}>Add Layer</button>
                <button onClick={removeLayer}>Remove Layer</button>
                <p>Current Layers: {layers}</p>
            </div>
        </div>
    );
};

export default WaveCustomizer;
