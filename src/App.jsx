import React, { useState, useRef } from 'react';
import WaveCustomizer from './WaveCustomizer';
import WavePreview from './WavePreview';
import './App.css';

const App = () => {
  const [waveSettings, setWaveSettings] = useState({
    color: '#00bfa5',
    gradient: false,
    animate: false,
    flip: false,
  });

  const [layers, setLayers] = useState(1);
  const waveRef = useRef(null);
  const [svgCode, setSvgCode] = useState('');

  const handleWaveChange = (layerCount, color, gradient, animate, flip) => {
    setLayers(layerCount);
    setWaveSettings({ color, gradient, animate, flip });
  };

  const generateWaves = () => {
    const svgElement = waveRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    setSvgCode(svgString);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svgCode)
      .then(() => alert('SVG code copied to clipboard!'))
      .catch((err) => console.error('Error copying SVG code: ', err));
  };

  return (
    <div className="App" ref={waveRef}>
      <h1>SVG Wave Generator</h1>
      <WaveCustomizer onChange={handleWaveChange} layers={layers} setLayers={setLayers} />
      <WavePreview layers={layers} {...waveSettings} />
      <button onClick={generateWaves}>Export</button>
      {svgCode && (
        <div>
          <h2>SVG Code:</h2>
          <textarea readOnly value={svgCode} rows={20} cols={50} />
          <br/>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default App;
