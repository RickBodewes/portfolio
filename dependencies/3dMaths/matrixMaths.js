//making matrixes
function MakePerspectiveMatrix(FOV, ASPECT_RATIO, FRONT, BACK) {
    //making an empty matrix
    let matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    //setting the parameters
    let TANGENT = Math.tan(FOV / 2 * (Math.PI / 180));
    let HEIGHT = FRONT * TANGENT; //top and bottom
    let WIDTH = HEIGHT * ASPECT_RATIO; //right and left

    //filling the matrix
    //x
    matrix[0][0] = 2 * FRONT / (WIDTH - -WIDTH);
    //y
    matrix[1][1] = 2 * FRONT / (HEIGHT - -HEIGHT);
    //x
    matrix[2][0] = (WIDTH + -WIDTH) / (WIDTH - -WIDTH);
    matrix[2][1] = (HEIGHT + -HEIGHT) / (HEIGHT - -HEIGHT);
    matrix[2][2] = -(BACK + FRONT) / (BACK - FRONT);
    matrix[2][3] = -1;
    //w
    matrix[3][2] = (2 * BACK * FRONT) / (BACK - FRONT);
    matrix[3][3] = 0;

    return matrix;
}

//translation matrix
function MakeTranslateMatrix(POS) {
    //making an empty matrix
    let matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    //filling the matrix
    //x
    matrix[0][0] = 1;
    matrix[0][3] = POS.x;
    //y
    matrix[1][1] = 1;
    matrix[1][3] = POS.y;
    //x
    matrix[2][2] = 1;
    matrix[2][3] = POS.z;
    //w
    matrix[3][3] = 1;

    return matrix;
}

//scale matrix
function MakeScaleMatrix(SCALE){
    //making an empty matrix
    let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    //filling the matrix
    //x
    matrix[0][0] = SCALE.x;
    //y
    matrix[1][1] = SCALE.y;
    //z
    matrix[2][2] = SCALE.z;

    return matrix;
}

//rotation matrixes
//x
function MakeXrotateMatrix(THETA){
    //making an empty matrix
    let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    //filling the matrix
    //x
    matrix[0][0] = 1;
    //y
    matrix[1][1] = Math.cos(THETA * (Math.PI / 180));
    matrix[1][2] = -Math.sin(THETA * (Math.PI / 180));
    //z
    matrix[2][1] = Math.sin(THETA * (Math.PI / 180));
    matrix[2][2] = Math.cos(THETA * (Math.PI / 180));

    return matrix;
}

//y
function MakeYrotateMatrix(THETA){
    //making an empty matrix
    let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    //filling the matrix
    //x
    matrix[0][0] = Math.cos(THETA * (Math.PI / 180));
    matrix[0][2] = Math.sin(THETA * (Math.PI / 180));
    //y
    matrix[1][1] = 1;
    //z
    matrix[2][0] = -Math.sin(THETA * (Math.PI / 180));
    matrix[2][2] = Math.cos(THETA * (Math.PI / 180));

    return matrix;
}

//z
function MakeZrotateMatrix(THETA){
    //making an empty matrix
    let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    //filling the matrix
    //x
    matrix[0][0] = Math.cos(THETA * (Math.PI / 180));
    matrix[0][1] = -Math.sin(THETA * (Math.PI / 180));
    //y
    matrix[1][0] = Math.sin(THETA * (Math.PI / 180));
    matrix[1][1] = Math.cos(THETA * (Math.PI / 180));
    //z
    matrix[2][2] = 1;

    return matrix;
}

//matrix multiplications
function MatMult4x4(m, v){
    let x = v.x * m[0][0] + v.y * m[0][1] + v.z  * m[0][2] + m[0][3];
    let y = v.x * m[1][0] + v.y * m[1][1] + v.z  * m[1][2] + m[1][3];
    let z = v.x * m[2][0] + v.y * m[2][1] + v.z  * m[2][2] + m[2][3];
    let w = v.x * m[3][0] + v.y * m[3][1] + v.z  * m[3][2] + m[3][3];

    if(w != 0){
        x /= w;
        y /= w;
        z /= w;
    }

    return new Vector3(x, y, z);
}

function MatMult3x3(m, v){
    let x = v.x * m[0][0] + v.y * m[0][1] + v.z  * m[0][2];
    let y = v.x * m[1][0] + v.y * m[1][1] + v.z  * m[1][2];
    let z = v.x * m[2][0] + v.y * m[2][1] + v.z  * m[2][2];
    
    return new Vector3(x, y, z);
}