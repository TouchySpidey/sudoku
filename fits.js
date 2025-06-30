function fitsInSquare(x, y, val) {
    let squareX = 0;
    let squareY = 0;
    switch (x) {
        case 0: case 1: case 2: squareX = 0; break;
        case 3: case 4: case 5: squareX = 1; break;
        case 6: case 7: case 8: squareX = 2; break;
    }

    switch (y) {
        case 0: case 1: case 2: squareY = 0; break;
        case 3: case 4: case 5: squareY = 1; break;
        case 6: case 7: case 8: squareY = 2; break;
    }

    for (let i = squareX * 3; i < squareX * 3 + 3; i++) {
        for (let j = squareY * 3; j < squareY * 3 + 3; j++) {
            if (matrix[j][i] == val) {
                return false;
            }
        }
    }
    return true;
}

function fitsInRow(y, val) {
    const row = matrix[y];
    return !row.includes(val);
}

function fitsInColumn(x, val) {
    const column = [];
    for (let i = 0; i < 9; i++) {
        column.push(matrix[i][x]);
    }
    return !column.includes(val);
}

function fits(x, y, val) {
    if (matrix[y][x] != 0) {
        console.log('not empty ', { x, y, val, cell: matrix[y][x] });
        return false;
    }
    console.log('%cchecking if it fits', 'color:rgb(212, 0, 255)');
    console.log({x, y, val});
    let inRow = fitsInRow(y, val);
    let inCol = fitsInColumn(x, val);
    let inSqu = fitsInSquare(x, y, val);
    console.log({ inRow, inCol, inSqu });
    return inRow && inCol && inSqu;
}