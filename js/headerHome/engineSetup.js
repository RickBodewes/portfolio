//getting canvas elements
let canvas_HH = document.getElementById('header_canvas');
let ctx_HH = canvas_HH.getContext('2d');

//setting canvas width and height
canvas_HH.width = canvas_HH.clientWidth;
canvas_HH.height = canvas_HH.clientHeight;

//creating the perspective matrix
let FOV_HH = 120;
let ASPECT_RATIO_HH = canvas_HH.width / canvas_HH.height;
let FRONT_HH = .1;
let BACK_HH = 10;

let perspectiveMatrix_HH = MakePerspectiveMatrix(FOV_HH, ASPECT_RATIO_HH, FRONT_HH, BACK_HH);

//remaking the perspective matric on window resize
window.addEventListener('resize', () => {
    canvas_HH.width = canvas_HH.clientWidth;
    canvas_HH.height = canvas_HH.clientHeight;
    
    ASPECT_RATIO_HH = canvas_HH.width / canvas_HH.height;

    perspectiveMatrix_HH = MakePerspectiveMatrix(FOV_HH, ASPECT_RATIO_HH, FRONT_HH, BACK_HH);
});

//making the gameloop
function loop_HH(timestamp) {
    let progress = timestamp - lastRender_HH;

    update_HH(progress / 1000)
    draw_HH()

    lastRender = timestamp
    window.requestAnimationFrame(loop_HH)
}
let lastRender_HH = 0
window.requestAnimationFrame(loop_HH)
