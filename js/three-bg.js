/**
 * Three.js Particle Background Logic
 * Creates a flowing, interactive particle mesh.
 */

let scene, camera, renderer, particles, count = 0;
const mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function init() {
    const container = document.body;
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    container.prepend(canvas);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    const numParticles = 1000;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0, j = 0;

    for (let ix = 0; ix < 100; ix++) {
        for (let iy = 0; iy < 10; iy++) {
            positions[i] = ix * 100 - ( (100 * 100) / 2 ); // x
            positions[i + 1] = 0; // y
            positions[i + 2] = iy * 100 - ( (10 * 100) / 2 ); // z

            scales[j] = 1;

            i += 3;
            j++;
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0x00f5ff) }
        },
        vertexShader: `
            attribute float scale;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = scale * ( 300.0 / - mvPosition.z );
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            void main() {
                if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
                gl_FragColor = vec4( color, 1.0 );
            }
        `
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('bg-canvas'),
        antialias: true,
        alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );

    const positions = particles.geometry.attributes.position.array;
    const scales = particles.geometry.attributes.scale.array;

    let i = 0, j = 0;

    for ( let ix = 0; ix < 100; ix ++ ) {
        for ( let iy = 0; iy < 10; iy ++ ) {
            positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                            ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
            scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 20 +
                            ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 20;
            i += 3;
            j ++;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;

    renderer.render( scene, camera );
    count += 0.1;
}

// Check for THREE before starting
const checkThree = setInterval(() => {
    if (typeof THREE !== 'undefined') {
        clearInterval(checkThree);
        init();
        animate();
    }
}, 100);
