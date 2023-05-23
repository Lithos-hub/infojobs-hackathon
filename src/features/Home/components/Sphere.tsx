import { FC, useRef } from 'react';

import { Vector3, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Props {
	position: Vector3;
	args: [number, number, number];
	scale: number;
	color: string;
	wireframe?: boolean;
}

const Sphere: FC<Props> = ({ position, args, scale, color, wireframe }) => {
	const sphereRef = useRef<Mesh>(null);

	useFrame((_, delta) => {
		if (!sphereRef.current) return;
		sphereRef.current.rotation.x -= delta / 10;
		sphereRef.current.rotation.y -= delta / 12;
	});
	return (
		<mesh ref={sphereRef} position={position} scale={scale} receiveShadow castShadow>
			<sphereGeometry args={args} />
			{/* <meshStandardMaterial color={color} wireframe={wireframe} /> */}
			<meshStandardMaterial color={color} wireframe={wireframe} roughness={0.5} metalness={0.1} />
		</mesh>
	);
};

export default Sphere;
