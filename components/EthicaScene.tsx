"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const pillars = [
  { key: "social", color: 0xd65b2d, position: [-2.05, .25, .35] },
  { key: "emocional", color: 0xf7f4ea, position: [1.55, 1.35, -.2] },
  { key: "afetiva", color: 0xf08a5d, position: [-.8, 2.0, -.45] },
  { key: "cognitiva", color: 0x7385cc, position: [2.05, -.5, .2] },
  { key: "motora", color: 0xffffff, position: [-.65, -1.9, -.15] },
] as const;

const vertexShader = `
  uniform float uTime;
  uniform float uEnergy;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * .3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
    return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
  }
  void main() {
    float n=noise(position*1.45+uTime*.18)+.5*noise(position*3.0-uTime*.11);
    vec3 p=position+normal*((n-.65)*(.21+uEnergy*.08)+sin(uTime+position.y*2.0)*.035);
    vNormal=normalize(normalMatrix*normal); vPosition=p;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDir=normalize(cameraPosition-vPosition);
    float fresnel=pow(1.0-abs(dot(vNormal,viewDir)),2.2);
    float band=sin(vPosition.y*8.0-uTime*.7)*.5+.5;
    vec3 orange=vec3(.84,.35,.14); vec3 deep=vec3(.19,.035,.018);
    vec3 color=mix(deep,orange,.42+fresnel*.65+band*.06);
    color+=vec3(1.0,.72,.42)*pow(max(dot(vNormal,normalize(vec3(-.5,.8,1.0))),0.0),10.0)*.7;
    gl_FragColor=vec4(color,1.0);
  }
`;

export default function EthicaScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 100);
    camera.position.set(0, 0, 7.4);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const keyLight = new THREE.DirectionalLight(0xffd3b8, 3.4);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xd9ef67, 18, 12);
    rimLight.position.set(3, -2, 2);
    scene.add(rimLight);

    const group = new THREE.Group();
    group.rotation.z = -.08;
    scene.add(group);

    const uniforms = { uTime: { value: 0 }, uEnergy: { value: 0 } };
    const coreGeometry = new THREE.IcosahedronGeometry(1.28, 6);
    const coreMaterial = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(2.55, .012, 8, 220),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .2 })
    );
    halo.rotation.set(1.06, .12, -.28);
    group.add(halo);

    // Open arcs echo the gesture of the blue-and-orange school mark without
    // literally redrawing it, turning the central learner into a brand cue.
    const brandArc = new THREE.Mesh(
      new THREE.TorusGeometry(1.62, .055, 10, 120, Math.PI * 1.52),
      new THREE.MeshStandardMaterial({ color: 0xd65b2d, roughness: .35, metalness: .02 })
    );
    brandArc.rotation.set(.42, -.2, .62);
    group.add(brandArc);
    const brandArcSmall = new THREE.Mesh(
      new THREE.TorusGeometry(1.43, .022, 8, 100, Math.PI * 1.2),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .62 })
    );
    brandArcSmall.rotation.set(-.5, .18, -2.15);
    group.add(brandArcSmall);

    const moduleMeshes: THREE.Mesh[] = [];
    const connectionMeshes: THREE.Mesh[] = [];
    const signalMeshes: THREE.Mesh[] = [];
    const connectionCurves: THREE.QuadraticBezierCurve3[] = [];
    pillars.forEach((pillar, index) => {
      const geometry = new RoundedBoxGeometry(1.25, .52, .42, 5, .15);
      const material = new THREE.MeshStandardMaterial({ color: pillar.color, roughness: .3, metalness: .04 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...pillar.position);
      mesh.rotation.z = Math.atan2(pillar.position[1], pillar.position[0]) + Math.PI / 2;
      mesh.userData = { key: pillar.key, basePosition: mesh.position.clone(), index };
      moduleMeshes.push(mesh);
      group.add(mesh);

      const end = new THREE.Vector3(...pillar.position).multiplyScalar(.78);
      const control = end.clone().multiplyScalar(.56);
      control.z += index % 2 === 0 ? .48 : -.38;
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(), control, end);
      connectionCurves.push(curve);
      const connection = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 36, .018, 7, false),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .2 })
      );
      connection.userData = { key: pillar.key };
      connectionMeshes.push(connection);
      group.add(connection);

      const signal = new THREE.Mesh(
        new THREE.SphereGeometry(.065, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0xd65b2d })
      );
      signal.userData = { key: pillar.key, index };
      signalMeshes.push(signal);
      group.add(signal);

      const joint = new THREE.Mesh(
        new THREE.TorusGeometry(.15, .045, 12, 40),
        new THREE.MeshStandardMaterial({ color: 0x171f67, roughness: .42 })
      );
      joint.position.set(.62, 0, .22);
      joint.rotation.x = Math.PI / 2;
      mesh.add(joint);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    let active = "social";
    let visible = true;
    let frame = 0;
    let scrollProgress = 0;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = Date.now();

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };
    const pointerFromEvent = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      targetPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetPointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onPointerMove = (event: PointerEvent) => pointerFromEvent(event);
    const onPointerDown = (event: PointerEvent) => {
      pointerFromEvent(event);
      raycaster.setFromCamera(targetPointer, camera);
      const hit = raycaster.intersectObjects(moduleMeshes, false)[0]?.object as THREE.Mesh | undefined;
      if (hit?.userData.key) window.dispatchEvent(new CustomEvent("etica-pillar-selected", { detail: hit.userData.key }));
    };
    const onScroll = () => {
      scrollProgress = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    };
    const onPillar = (event: Event) => {
      active = (event as CustomEvent<string>).detail;
      uniforms.uEnergy.value = 1;
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "180px" });
    observer.observe(mount);

    resize();
    onScroll();
    addEventListener("resize", resize);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("etica-pillar", onPillar);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible) return;
      const t = (Date.now() - startedAt) / 1000;
      pointer.lerp(targetPointer, .045);
      uniforms.uTime.value = reduceMotion ? 0 : t;
      uniforms.uEnergy.value *= .965;
      group.rotation.x += ((pointer.y * .22 + scrollProgress * .5) - group.rotation.x) * .035;
      group.rotation.y += ((pointer.x * .34 + scrollProgress * 2.0 + (reduceMotion ? 0 : t * .055)) - group.rotation.y) * .028;
      moduleMeshes.forEach((mesh, index) => {
        const selected = mesh.userData.key === active;
        const targetScale = selected ? 1.3 : 1;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), .07);
        const base = mesh.userData.basePosition as THREE.Vector3;
        mesh.position.y = base.y + (reduceMotion ? 0 : Math.sin(t * .9 + index) * .055);
      });
      connectionMeshes.forEach(connection => {
        const selected = connection.userData.key === active;
        const material = connection.material as THREE.MeshBasicMaterial;
        material.opacity += ((selected ? .85 : .16) - material.opacity) * .08;
        material.color.lerp(new THREE.Color(selected ? 0xd65b2d : 0xffffff), .08);
      });
      signalMeshes.forEach((signal, index) => {
        const selected = signal.userData.key === active;
        const travel = reduceMotion ? .72 : (t * (selected ? .32 : .12) + index * .19) % 1;
        signal.position.copy(connectionCurves[index].getPoint(travel));
        const signalScale = selected ? 1.5 : .72;
        signal.scale.lerp(new THREE.Vector3(signalScale, signalScale, signalScale), .08);
      });
      halo.rotation.z += reduceMotion ? 0 : .0012;
      brandArc.rotation.z += reduceMotion ? 0 : .0016;
      brandArcSmall.rotation.z -= reduceMotion ? 0 : .0011;
      camera.position.x += (pointer.x * .22 - camera.position.x) * .025;
      camera.position.y += (pointer.y * .15 - camera.position.y) * .025;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("resize", resize);
      removeEventListener("scroll", onScroll);
      removeEventListener("etica-pillar", onPillar);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
        objectMaterials.forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div className="ethica-scene" ref={mountRef} aria-hidden="true" />;
}
