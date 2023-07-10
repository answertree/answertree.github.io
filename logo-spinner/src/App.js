import { useState, useTransition } from 'react'
import { useControls } from 'leva'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls, ContactShadows, CameraShake, Stars } from '@react-three/drei'
import { EffectComposer, Vignette, Bloom, BrightnessContrast, HueSaturation } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { Sparkles, Shadow, Billboard } from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [-5, 0, -5], fov: 95 }}>
      <group position={[0, -1.3, 0]}>
        <group rotation={[0, Math.PI / 3, 0]}>
          <AnswertreeLogo />
        </group>

        {/* <ambientLight intensity={0.7} /> */}
        <AccumulativeShadows temporal frames={200} color="darkpurple" colorBlend={0.7} opacity={1} scale={20} alphaTest={0.85}>
          <RandomizedLight amount={5} radius={5} ambient={0.5} position={[6, 4.5, 2]} bias={0.001} />
        </AccumulativeShadows>
      </group>
      <Env />
      <EffectComposer disableNormalPass>
        <Vignette eskil={false} offset={0.15} darkness={0.7} />
      </EffectComposer>

      <OrbitControls autoRotate autoRotateSpeed={2} enablePan={true} enableZoom={true} minPolarAngle={Math.PI / 6.5} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  )
}

function AnswertreeLogo() {
  const { nodes } = useGLTF('./answertree-logo-bevel.gltf')

  const { roughness, metalness, depth } = useControls({
    roughness: { value: 0.5, min: 0, max: 1 },
    depth: { value: 100, min: 10, max: 300 }
  })
  return (
    <mesh castShadow geometry={nodes.Curve.geometry} scale={[230, depth, 230]} rotation={[Math.PI / 2, 0, -Math.PI / 8]} position={[0.2, 1.7, 0]}>
      <meshStandardMaterial metalness={1} roughness={roughness} color="rgb(32, 135, 88)" />
      <Sparkles count={100} scale={0.09} size={1.5} speed={1.4} color={'white'} position={[0, 0, -0.03]} />
    </mesh>
  )
}

function Env() {
  const [preset, setPreset] = useState('dawn')
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition()
  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },

    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => startTransition(() => setPreset(value))
    }
  })
  return <Environment preset={preset} background blur={blur} rotation={[10, 1.5, 2]} />
}
useGLTF.preload('./answertree-logo-bevel.gltf')
