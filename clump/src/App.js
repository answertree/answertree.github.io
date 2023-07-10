import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, useTexture } from "@react-three/drei"
import { Physics, useSphere } from "@react-three/cannon"
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 24, 24)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "white", roughness: 0, envMapIntensity: 1 })

let numBalls = parseInt(document.location.search.replace("?", "")) || 30
export const App = () => (
  <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 20], fov: 45, near: 1, far: 40 }}>
    <ambientLight intensity={0.5} />
    {/* <fog attach="fog" args={["#dfdfdf", 12, 40]} /> */}
    <color attach="background" args={["#dfdfdf"]} />
    <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
    <Physics gravity={[0, 0, 5]} iterations={10}>
      <Pointer />
      <Clump />
    </Physics>
    <Environment files="./adamsbridge.hdr" />
    <EffectComposer disableNormalPass multisampling={0}>
      <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={5} denoiseSamples={4} />
      <SMAA />
    </EffectComposer>
  </Canvas>
)

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const texture = useTexture("./at.png")
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.9999,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
    rotation: [0, -Math.PI / 2, 0],
    fixedRotation: document.location.search.includes("fixedRotation"),
  }))
  useFrame((state) => {
    for (let i = 0; i < numBalls; i++) {
      ref.current.getMatrixAt(i, mat)
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-40).toArray(), [0, 0, 0])

      // api.at(i).applyForce(vec.set(rfs(100), rfs(100), 0).toArray(), [0, 0, 0])
    }
  })
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, numBalls]}
      geometry={sphereGeometry}
      material={baubleMaterial}
      material-map={texture}
    />
  )
}

function Pointer() {
  const viewport = useThree((state) => state.viewport)

  const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [1000, 10000, 10000] }))
  return useFrame((state) => {
    // console.log(state.mouse)
    if (state.mouse.x === 0 && state.mouse.y === 0) return
    api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0)
  })
}
