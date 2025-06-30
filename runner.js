function solve() {
    let completed = true;
    do {
        run();
        for (let i = 0; i < 9; i++) {
            if (matrix[i].includes(0)) {
                completed = false;
                break;
            }
        }
    } while (!completed);
}

function run() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let val = 1; val <= 9; val++) {
                console.log('%cchecking for fit ', 'color:rgb(115, 255, 0)');
                console.log({ x: j, y: i, val });
                if (perfectFit(j, i, val)) {
                    console.log('%cit fits', 'font-size: 30px; color:goldenrod;');
                    console.log({ x: j, y: i, val });
                    setVal(j, i, val);
                }
            }
        }
    }
}