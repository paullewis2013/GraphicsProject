const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1,10,1);
const geometry2 = new THREE.BoxGeometry(7.5,1,1);
const geometry3 = new THREE.SphereGeometry( 1.5, 16, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );


var specialCubeArr = []

//make floating spheres
for(let i = 0; i < 20; i++){
    specialCubeArr[i] = new THREE.Mesh( geometry3, material );
    specialCubeArr[i].position.x -= i * 5
    specialCubeArr[i].position.y = 5 + Math.random() * 25;
    specialCubeArr[i].position.z = -10 + Math.random() * 30;

    scene.add( specialCubeArr[i] );
}

// const cube = new THREE.Mesh( geometry2, material );
// scene.add( cube );
// const cube2 = new THREE.Mesh( geometry2, material );
// scene.add( cube2 );

// cube2.position.y = -30;

camera.position.z = 40;
camera.position.y = 25;
camera.rotation.x = -0.1;

// const color = 0xFFFFFF;
const skyColor =   0xdc322f; 
const groundColor = 0x6c71c4;
const intensity = 0.4;
// const light3 = new THREE.AmbientLight(color, intensity);
const light3 = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light3);

// const light = new THREE.PointLight( 0xf58b5f, 2, 100 );
// light.position.set( 0, 0, 5 );
// scene.add( light );

// const light2 = new THREE.PointLight( 0xf58b5f, 2, 100 );
// light2.position.set( 0, 0, 30 );
// scene.add( light2 );


var cubeArr = [];
noise.seed(Math.random());

for(let i = 0; i < 100; i++){

    cubeArr[i] = []

    for(let j = 0; j < 48; j++){

        let tempColor = randColor()
        let tempMat = new THREE.MeshBasicMaterial( { color: tempColor} );

        if(Math.random() < 0.9){
            tempColor = 0x000000;
            tempMat = new THREE.MeshBasicMaterial( { color: tempColor} );
        }

        let tempCube = new THREE.Mesh(geometry, tempMat);
        tempCube.position.x = -50 + i
        tempCube.position.z = -16 + j

        //add line here to set y position to perlin noise
        console.log(noise.simplex2())
        tempCube.position.y =  1.5 * noise.simplex3(i, j, 0)
        //changed this
        cubeArr[i][j] = tempCube
        scene.add(cubeArr[i][j])
    }
}

function randColor(){

    colors = [
        // 0xb58900,
        0xcb4b16,
        0xdc322f,
        // 0xd33682,
        // 0x6c71c4,
        // 0x268bd2,
        // 0x2aa198,
        // 0x859900
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}

var frameNum = 0


const animate = function () {

    frameNum++;
    requestAnimationFrame( animate );

    for(let i = 0; i < specialCubeArr.length; i++){
        specialCubeArr[i].rotation.x += 0.02;
        specialCubeArr[i].position.x += 0.05;

        if(specialCubeArr[i].position.x > 45){
            specialCubeArr[i].position.x -= 90
        }
    }

    // cube2.rotation.y += 0.005;
    // cube2.position.y += 0.05;
    // // light2.position.y += 0.05;

    // if(cube.position.y > 45){
    //     cube.position.y = -5;
    //     // light.position.y = 15;
    // }
    // if(cube2.position.y > 45){
    //     cube2.position.y = -5;
    //     // light2.position.y = 15;
    // }

    for(let i = 0; i < cubeArr.length; i++){
        for(let j= 0; j < cubeArr[i].length; j++){

            //update y position with random noise
            cubeArr[i][j].position.y = 7 * noise.simplex3(i/16, j/17, frameNum/500)

            if(Math.random() < 0.0002){
                let tempColor = randColor()
                let tempMat = new THREE.MeshBasicMaterial( { color: tempColor} );
                cubeArr[i][j].material = tempMat
            }else if(Math.random() < 0.02){
                let tempColor = 0xffffff
                let tempMat = new THREE.MeshLambertMaterial( { color: tempColor} );
                cubeArr[i][j].material = tempMat
            }
        }
    }

    renderer.render( scene, camera );
};

animate();

