import { useState, useTransition } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'

import { useGLTF } from '@react-three/drei'
export default function App() {
  return (
    <Canvas shadows camera={{ position: [10, 10, 4], fov: 70, rotation: [1, 0.5, 1] }}>
      <group position={[0, -1.3, 0]}>
        <group rotation={[0, 0.5, 0]}>
          <AnswertreeLogo />
        </group>
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.6} opacity={1} scale={20} alphaTest={0.85}>
          <RandomizedLight amount={7} radius={3} ambient={0.6} position={[3, 4.5, 5]} bias={0.001} />
        </AccumulativeShadows>
      </group>
      <Env />
      <OrbitControls autoRotate autoRotateSpeed={2} zoom0={1} enablePan={true} enableZoom={true} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  )
}

function AnswertreeLogo() {
  const { nodes } = useGLTF('/answertree-logo.gltf')

  const { roughness, metalness, depth } = useControls({
    roughness: { value: 0.7, min: 0, max: 1 },

    depth: { value: 100, min: 10, max: 300 }
  })
  return (
    <Center top>
      <mesh castShadow geometry={nodes.Curve.geometry} scale={[230, depth, 230]} rotation={[Math.PI / 2, 0, Math.PI / 6]} position={[0, 0.89, 0]}>
        <meshStandardMaterial metalness={0.9} roughness={roughness} color="rgb(62, 165, 118)" />
      </mesh>
    </Center>
  )
}

function Env() {
  const [preset, setPreset] = useState('sunset')
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition()
  const { blur } = useControls({
    blur: { value: 0.75, min: 0.4, max: 1 },

    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => startTransition(() => setPreset(value))
    }
  })
  return <Environment preset={preset} background blur={blur} />
}
useGLTF.preload('/answertree-logo.gltf')
