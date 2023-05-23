import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Sphere from './Sphere';

const LightScene = () => {
	return (
		<Canvas shadows camera={{ position: [0, 0, 20], fov: 45, far: 80 }} className='z-0'>
			<fog attach='fog' args={['white', 5, 50]} />
			<color attach='background' args={['#fff']} />
			<ambientLight intensity={0.1} color='white' />

			<directionalLight color='white' position={[-10, -5, 20]} intensity={1} castShadow />
			<directionalLight color='white' position={[10, -5, 20]} intensity={1} castShadow />

			<Float>
				<Sphere position={[8, -4, -55]} args={[50, 1, 4]} scale={1} color='gray' wireframe />
			</Float>
			<Float>
				<Sphere position={[0, 0, -5]} args={[20, 1, 4]} scale={1} color='#167DB7' wireframe />
			</Float>
		</Canvas>
	);
};

export default LightScene;
