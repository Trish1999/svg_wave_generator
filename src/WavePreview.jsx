import React from 'react';

const WavePreview = ({ layers, color, gradient, animate, flip }) => {
    const waveStyle = {
        transform: flip ? 'scaleY(-1)' : 'none',
        transition: 'transform 0.3s',
    };

    const generateDarkerColor = (baseColor, layerIndex) => {
        const darkerColor = (opacity) => {
            const hexColor = baseColor.replace('#', '');
            const r = Math.max(0, parseInt(hexColor.slice(0, 2), 16) - layerIndex * 15);
            const g = Math.max(0, parseInt(hexColor.slice(2, 4), 16) - layerIndex * 15);
            const b = Math.max(0, parseInt(hexColor.slice(4, 6), 16) - layerIndex * 15);
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        };

        return darkerColor(layerIndex);
    };

    const waves = [];
    for (let i = 0; i < layers; i++) {
        const waveHeight = 20 + Math.random() * 30; // Random height between 20 and 50
        const offset = Math.random() * 20; // Random offset for the edges

        waves.push(
            <path
                key={i}
                fill={gradient ? 'url(#grad1)' : generateDarkerColor(color, i)}
                style={{
                    animation: animate ? 'waveAnim 2s infinite linear' : 'none',
                }}
                d={`M0,${waveHeight + offset} C150,${waveHeight + 50 + offset} 300,${waveHeight - 20 + offset} 450,${waveHeight + offset} C600,${waveHeight + 50 + offset} 750,${waveHeight - 20 + offset} 900,${waveHeight + offset} C1050,${waveHeight + 50 + offset} 1200,${waveHeight - 20 + offset} 1350,${waveHeight + offset} L1350,00 L0,0 Z`}
            />
        );
    }

    return (
        <svg viewBox="0 0 1200 200" style={{ height: '200px', ...waveStyle }}>
            {gradient && (
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                </linearGradient>
            )}
            {waves}
        </svg>
    );
};

export default WavePreview;
