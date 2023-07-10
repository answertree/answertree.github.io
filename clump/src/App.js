import * as THREE from "three"
import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sparkles, Environment, useTexture, OrbitControls } from "@react-three/drei"
import { Physics, useSphere } from "@react-three/cannon"
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphereGeometry2 = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0,
  envMapIntensity: 1,
})
const baubleMaterial2 = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0,
  envMapIntensity: 1,
})

let mouseDown = false
let clickRandom = 0.5
let numBalls = parseInt(document.location.search.replace("?", "")) || 16
export const App = () => {
  const container = useRef()
  // const [mouseDown, setMouseDown] = useState(false)
  useEffect(() => {
    const onPointerUp = () => {
      // setMouseDown(false)
      mouseDown = false
    }
    const onPointerDown = (event) => {
      if (event.button === 2) {
        return
      }
      mouseDown = true
      clickRandom = Math.random()
      // setMouseDown(true)
    }
    const onPointerMove = () => {}

    container.current.addEventListener("pointerup", onPointerUp)
    container.current.addEventListener("pointerdown", onPointerDown)
    container.current.addEventListener("pointermove", onPointerMove)

    return () => {
      container.current.removeEventListener("pointerup", onPointerUp)
      container.current.removeEventListener("pointerdown", onPointerDown)
      container.current.removeEventListener("pointermove", onPointerMove)
    }
  }, [])

  return (
    <div ref={container} style={{ height: "100%" }}>
      <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 22], fov: 45, near: 0.1, far: 100 }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
        <Physics gravity={[0, 1, 0]} iterations={10}>
          <Pointer />
          <Clump />
          <Clump2 />
        </Physics>
        <color attach="background" args={["#dfdfdf"]} />
        <Environment files="./adamsbridge.hdr" />
        <EffectComposer disableNormalPass multisampling={0}>
          <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={5} denoiseSamples={4} />
          <SMAA />
        </EffectComposer>
        <OrbitControls autoRotate={true} autoRotateSpeed={0.6} minDistance={15} maxDistance={50} enablePan={false} enableZoom={true} enableRotate={false} />
      </Canvas>
    </div>
  )
}

const startDist = 28

function updateSphereForce(ref, mat, api, vec) {
  return (state) => {
    for (let i = 0; i < numBalls; i++) {
      ref.current.getMatrixAt(i, mat)
      api.at(i).applyForce(
        vec
          .setFromMatrixPosition(mat)
          .normalize()
          .multiplyScalar(-40 + i * -1) //-40 + i * -0.5)
          .toArray(),
        [0, 0, 0],
      )

      // api.at(i).applyForce(vec.set(rfs(100), rfs(100), 0).toArray(), [0, 0, 0])
    }
  }
}

function sphereConfig() {
  return {
    args: [1],
    mass: 1,
    angularDamping: 0.6,
    linearDamping: 0.8,
    position: [rfs(startDist), rfs(startDist), rfs(startDist)],

    rotation: [0, -Math.PI / 2, 0],
    fixedRotation: document.location.search.includes("fixedRotation"),
  }
}
function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const texture = useTexture("./at.png")
  const [ref, api] = useSphere(() => sphereConfig())
  useFrame(updateSphereForce(ref, mat, api, vec))
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

function Clump2({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const texture2 = useTexture("./at3.png")
  const [ref, api] = useSphere(() => sphereConfig())
  useFrame(updateSphereForce(ref, mat, api, vec))
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, numBalls]}
      geometry={sphereGeometry2}
      material={baubleMaterial2}
      material-map={texture2}
    />
  )
}

function Pointer() {
  const viewport = useThree((state) => state.viewport)

  const [, api] = useSphere(() => ({ type: "Kinematic", args: [3.5], position: [1000, 10000, 10000] }))
  return useFrame((state) => {
    // console.log(state.mouse)
    if (state.mouse.x === 0 && state.mouse.y === 0) return
    api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, mouseDown ? 0 : 10000)
  })
}
