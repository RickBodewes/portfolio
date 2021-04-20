//perlin variables
let perlinResolution = 10;
let perlinAmplifier = 2;
let perlinSpeedX = 4;
let perlinSpeedZ = 2;
let perlinPositionX = 0;
let perlinPositionZ = 0;

//mesh variables
let mesh = [];
let meshSquaresX = 40;
let meshSquaresZ = 21;
let meshPosition = new Vector3(0, 0, 200);
let meshRotation = new Vector3(-25, 0, 0);
let meshScale = new Vector3(12, 12, 12);
let meshBendFactor = .015;

//array of faces
let faces = [];

//the update cycle
function update_HH(progress){
    //updating perlin
    perlinPositionX += perlinSpeedX * progress;
    perlinPositionZ += perlinSpeedZ * progress;
    
    //TODO: optimize this process of updating the mesh
    populateMesh();

    //generating the faces
    faces = [];
    for(let x = 0; x < meshSquaresX; x++){
        for(let z = 0; z < meshSquaresZ; z++){
            //each square consists of 2 faces (triangles)
            //tri 1: bot-left, top-left, top-right 
            //tri 1: bot-left, top-right, bot-right 

            //also ofsetting x and y by half of the total squares to center rotational point
            let offsetX = meshSquaresX / 2;
            let offsetZ = meshSquaresZ / 2;

            faces.push([
                new Vector3(x - offsetX, mesh[x][z], z - offsetZ),
                new Vector3(x - offsetX + 1, mesh[x + 1][z], z - offsetZ),
                new Vector3(x - offsetX + 1, mesh[x + 1][z + 1], z - offsetZ + 1)
            ]);
            faces.push([
                new Vector3(x - offsetX, mesh[x][z], z - offsetZ),
                new Vector3(x - offsetX + 1, mesh[x + 1][z + 1], z - offsetZ + 1),
                new Vector3(x - offsetX, mesh[x][z + 1], z - offsetZ + 1)
            ]);
        }
    }
}

//the render cycle
function draw_HH(progress){
    ctx_HH.clearRect(0, 0, canvas_HH.width, canvas_HH.height);

    ctx_HH.fillText('FPS:' + Math.floor(1/progress), 50, 50)

    for(let i = 0; i < faces.length; i++){
        for(let j = 0; j < 3; j++){
            //scaling the mesg
            faces[i][j] = MatMult3x3(MakeScaleMatrix(meshScale), faces[i][j]);

            //rotating the mesh
            //x
            faces[i][j] = MatMult3x3(MakeXrotateMatrix(meshRotation.x), faces[i][j]);
            //y
            faces[i][j] = MatMult3x3(MakeYrotateMatrix(meshRotation.y), faces[i][j]);
            //z
            faces[i][j] = MatMult3x3(MakeZrotateMatrix(meshRotation.z), faces[i][j]);

            //translating the mesh
            faces[i][j] = MatMult4x4(MakeTranslateMatrix(meshPosition), faces[i][j]);
        }

        //projecting the face
        let projectedFace = {
            vert0: MatMult4x4(perspectiveMatrix_HH, faces[i][0]),
            vert1: MatMult4x4(perspectiveMatrix_HH, faces[i][1]),
            vert2: MatMult4x4(perspectiveMatrix_HH, faces[i][2])
        }

        for(let j = 0; j < 3; j++){
            //offsetting it to be positive and in screenspace
            projectedFace['vert' + j].x += 1;
            projectedFace['vert' + j].y -= 1;

            //multiplying it to screensize
            projectedFace['vert' + j].x *= (canvas_HH.width / 2);
            projectedFace['vert' + j].y *= -(canvas_HH.height / 2);

        }

        //drawing the triangle
        drawTriangle_HH(projectedFace.vert0, projectedFace.vert1, projectedFace.vert2)
    }
}

function populateMesh(){
    mesh = [];
    for(let x = 0; x < meshSquaresX + 1; x++){
    let rowY = []
        for(let z = 0; z < meshSquaresZ + 1; z++){
            rowY.push((noise.perlin2((x + perlinPositionX) / perlinResolution, (z + perlinPositionZ) / perlinResolution) * perlinAmplifier) + Math.pow(x - meshSquaresX / 2, 2) * meshBendFactor);
        }
        mesh.push(rowY);
    }
}

function drawTriangle_HH(vert0, vert1, vert2) {
    ctx_HH.beginPath();
    ctx_HH.moveTo(vert0.x, vert0.y);
    ctx_HH.lineTo(vert1.x, vert1.y);
    ctx_HH.lineTo(vert2.x, vert2.y);
    ctx_HH.lineTo(vert0.x, vert0.y);
    ctx_HH.stroke();
}
