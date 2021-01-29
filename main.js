const canvas;
const renderer;

init()

function init(){
    canvas = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({canvas});
}