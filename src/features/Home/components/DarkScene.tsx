import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Sphere from './Sphere';

const DarkScene = () => {
	return (
		<Canvas shadows camera={{ position: [0, 0, 20], fov: 45, far: 80 }} className='z-0'>
			{/* <fog attach='fog' args={['#167DB7', 1, 50]} /> */}
			<ambientLight intensity={1} color='#167DB7' />
			<directionalLight color='#167DB7' position={[0, 5, 0]} intensity={2} castShadow />
			<directionalLight color='cyan' position={[5, 5, 2]} intensity={10} castShadow />

			<Float>
				<Sphere position={[20, -15, 0]} args={[3, 8, 5]} scale={25} color='gray' wireframe />
			</Float>
			<Float>
				<Sphere position={[-10, -15, 0]} args={[3, 5, 5]} scale={30} color='#167DB7' wireframe />
			</Float>
		</Canvas>
	);
};

export default DarkScene;
