function onlyThereInSquare(x, y, val) {
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

    console.log('%cchecking if it fits in other cells of the same square ' + squareX + ', ' + squareY, 'color:rgb(255, 253, 148);');
    for (let j = squareX * 3; j < squareX * 3 + 3; j++) {
        for (let i = squareY * 3; i < squareY * 3 + 3; i++) {
            console.log('%cchecking cell ' + j + ', ' + i, 'color:rgb(255, 253, 148);');
            if (i == y && j == x) {
                console.log('%cthis is the cell we are checking', 'color:rgb(255, 253, 148);');
                continue;
            }
            if (matrix[i][j] != 0) {
                console.log('%cthis cell is not empty', 'color:rgb(255, 253, 148);');
                continue;
            }
            if (fits(j, i, val)) {
                return false;
            }
        }
    }

    return true;
}

function onlyThereInColumn(x, y, val) {
    console.log('%cchecking if it fits in other cells of the same column', 'color:rgb(255, 253, 148);');
    for (let j = 0; j < 9; j++) {
        if (j == y) continue;
        if (fits(x, j, val)) {
            return false;
        }
    }
    return true;
}

function onlyThereInRow(x, y, val) {
    console.log('%cchecking if it fits in other cells of the same row', 'color:rgb(255, 253, 148);');
    for (let i = 0; i < 9; i++) {
        if (i == x) continue;
        if (fits(i, y, val)) {
            return false;
        }
    }
    return true;
}

function fitsOnlyThere(x, y, val) {
    console.log('%cchecking if it fits only there', 'color:rgb(0, 240, 248);font-size: 20px; font-weight: bold');

    let inSquare = onlyThereInSquare(x, y, val);

    let inRow = onlyThereInRow(x, y, val);

    let inCol = onlyThereInColumn(x, y, val);

    console.log('%cfinished checking if it fits only there', 'color:rgb(0, 240, 248);font-size: 20px; font-weight: bold');
    console.log({ inSquare, inRow, inCol });
    return inSquare || inRow || inCol;
}

function perfectFit(x, y, val) {
    if (matrix[y][x] != 0) return false;
    return fits(x, y, val) && fitsOnlyThere(x, y, val);
}
