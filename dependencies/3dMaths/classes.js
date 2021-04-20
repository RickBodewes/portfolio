//vector classes
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

//object class
class element {
    constructor(obj) {
        this.ready = false;

        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);

        this.verts = [];
        this.faces = [];

        //loading the obj file
        $.get(obj, (res) => {
            let lines = res.split('\n');

            for (let line of lines) {
                if (line.startsWith('v ')) {
                    this.verts.push(new Vector3(parseFloat(line.split(' ')[1]), parseFloat(line.split(' ')[2]), parseFloat(line.split(' ')[3])));
                } else if (line.startsWith('f ')) {
                    let tempFace = [];

                    tempFace.push(parseInt(line.split(' ')[1] - 1));
                    tempFace.push(parseInt(line.split(' ')[2] - 1));
                    tempFace.push(parseInt(line.split(' ')[3] - 1));

                    this.faces.push(tempFace);
                }
            }

            this.ready = true;
        });
    }
}