"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedShapes() {
    const mesh1 = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (mesh1.current) {
            mesh1.current.rotation.x += delta * 0.2;
            mesh1.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <group position={[0, 0.2, 0]}>
            {/* Primary central shape */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1.5} floatingRange={[-0.1, 0.1]}>
                <mesh ref={mesh1} position={[0, 0, 0]} castShadow>
                    <icosahedronGeometry args={[1.2, 0]} />
                    <meshStandardMaterial
                        color="#4f46e5"
                        roughness={0.1}
                        metalness={0.8}
                        wireframe={true}
                    />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1.15, 0]} />
                    <meshStandardMaterial
                        color="#3b82f6"
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </Float>

        </group>
    );
}

export function Hero3D() {
    return (
        <div className="w-full h-[200px] md:h-[250px] relative">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                className="pointer-events-none"
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, -10, -10]} intensity={2} color="#4f46e5" />
                <directionalLight position={[10, -10, 10]} intensity={1} color="#ec4899" />

                <Environment preset="city" />
                <AnimatedShapes />

                <ContactShadows
                    position={[0, -1.8, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2.5}
                    far={3}
                    resolution={256}
                    color="#000000"
                />
            </Canvas>
        </div>
    );
}
