import React from 'react';
import { Leaf } from 'lucide-react';

const AnimatedBackground = () => {
    // Create layers of grass for realism
    const generateBlades = (count, depthClass, minHeight, maxHeight, opacityRange) =>
        Array.from({ length: count }).map((_, i) => ({
            id: `${depthClass}-${i}`,
            left: `${Math.random() * 100}%`,
            height: `${minHeight + Math.random() * (maxHeight - minHeight)}%`,
            width: `${1 + Math.random() * 2}px`,
            delay: `${Math.random() * 2}s`,
            duration: `${2 + Math.random() * 2}s`,
            rotation: `${-10 + Math.random() * 20}deg`, // Natural tilt
            depthClass,
            // Realistic organic gradients: dark earth green to sunlit lime
            color: `linear-gradient(to top, #064e3b, #10b981, #d1fae5)`,
            opacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
        }));

    const farBlades = generateBlades(60, 'grass-blade-far', 10, 25, [0.3, 0.5]);
    const midBlades = generateBlades(80, 'grass-blade-mid', 20, 40, [0.6, 0.8]);
    const nearBlades = generateBlades(40, 'grass-blade-near', 35, 55, [0.8, 1]);

    const allBlades = [...farBlades, ...midBlades, ...nearBlades].sort(() => Math.random() - 0.5);

    // Create 15 falling leaves
    const leaves = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${8 + Math.random() * 7}s`,
        size: 12 + Math.random() * 12,
        rotation: Math.random() * 360,
    }));

    return (
        <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden pointer-events-none z-0">
            {/* Falling Leaves */}
            {leaves.map((leaf) => (
                <div
                    key={`leaf-${leaf.id}`}
                    className="falling-leaf"
                    style={{
                        left: leaf.left,
                        animationDelay: leaf.delay,
                        animationDuration: leaf.duration,
                    }}
                >
                    <Leaf
                        size={leaf.size}
                        className="text-emerald-500/40"
                        style={{ transform: `rotate(${leaf.rotation}deg)` }}
                    />
                </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 h-48 w-full">
                {allBlades.map((blade) => (
                    <div
                        key={`grass-${blade.id}`}
                        className={`grass-blade absolute bottom-0 ${blade.depthClass}`}
                        style={{
                            left: blade.left,
                            height: blade.height,
                            width: blade.width,
                            background: blade.color,
                            animationDelay: blade.delay,
                            animationDuration: blade.duration,
                            opacity: blade.opacity,
                            transform: `rotate(${blade.rotation})`,
                        }}
                    />
                ))}
            </div>

            {/* Soft ground gradient */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-emerald-950/20 via-emerald-900/10 to-transparent"></div>
        </div>
    );
};

export default AnimatedBackground;
