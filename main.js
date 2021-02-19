const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffffff , wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 15;
camera.position.y = 8;
camera.rotation.x = -0.15;

var cubeArr = [];

for(let i = 0; i < 32; i++){

    cubeArr[i] = []

    for(let j = 0; j < 8; j++){

        let tempColor = randColor()
        let tempMat = new THREE.MeshBasicMaterial( { color: tempColor, wireframe: true} );

        if(Math.random() < 0.9){
            tempColor = 0x000000;
            tempMat = new THREE.MeshBasicMaterial( { color: tempColor} );
        }

        let tempCube = new THREE.Mesh(geometry, tempMat);
        tempCube.position.x = -32 + 2 * i
        tempCube.position.z = -8 + 2 * j

        cubeArr[i][j] = tempCube
        scene.add(cubeArr[i][j])
    }
}

function randColor(){

    colors = [
        0xb58900,
        0xcb4b16,
        0xdc322f,
        0xd33682,
        0x6c71c4,
        0x268bd2,
        0x2aa198,
        0x859900
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}


const animate = function () {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    cube.position.y += 0.05;
    if(cube.position.y > 15){
        cube.position.y = -1;
    }

    for(let i = 0; i < cubeArr.length; i++){
        for(let j= 0; j < cubeArr[i].length; j++){
            if(Math.random() < 0.0005){
                let tempColor = randColor()
                let tempMat = new THREE.MeshBasicMaterial( { color: tempColor, wireframe: true} );
                cubeArr[i][j].material = tempMat
            }else if(Math.random() < 0.005){
                let tempColor = 0x000000
                let tempMat = new THREE.MeshBasicMaterial( { color: tempColor, wireframe: true} );
                cubeArr[i][j].material = tempMat
            }
        }
    }

    renderer.render( scene, camera );
};

animate();

