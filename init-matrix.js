let $tableContainer = $('#sudo_gameplate');
let $table = $tableContainer.first('table')
let $tds = $table.find('td');
let matrix = [];
let guesse

function reset() {
    sudo_reset();
    $('#miconfirmok').click();
    $tableContainer = $('#sudo_gameplate');
    $table = $tableContainer.first('table')
    $tds = $table.find('td');
    matrix = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            const $td = $tds.eq(i*9 + j);
            const val = $td.text();
            row.push(val ? parseInt(val) : 0)
        }
        matrix.push(row);
    }
    // console.table(matrix)
}

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
        // console.log('not empty ', { x, y, val, cell: matrix[y][x] });
        return false;
    }
    // console.log('%cchecking if it fits', 'color:rgb(212, 0, 255)');
    // console.log({ x, y, val });
    let inRow = fitsInRow(y, val);
    let inCol = fitsInColumn(x, val);
    let inSqu = fitsInSquare(x, y, val);
    // console.log({ inRow, inCol, inSqu });
    return inRow && inCol && inSqu;
}



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

    // console.log('%cchecking if it fits in other cells of the same square ' + squareX + ', ' + squareY, 'color:rgb(255, 253, 148);');
    for (let j = squareX * 3; j < squareX * 3 + 3; j++) {
        for (let i = squareY * 3; i < squareY * 3 + 3; i++) {
            // console.log('%cchecking cell ' + j + ', ' + i, 'color:rgb(255, 253, 148);');
            if (i == y && j == x) {
                // console.log('%cthis is the cell we are checking', 'color:rgb(255, 253, 148);');
                continue;
            }
            if (matrix[i][j] != 0) {
                // console.log('%cthis cell is not empty', 'color:rgb(255, 253, 148);');
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
    // console.log('%cchecking if it fits in other cells of the same column', 'color:rgb(255, 253, 148);');
    for (let j = 0; j < 9; j++) {
        if (j == y) continue;
        if (fits(x, j, val)) {
            return false;
        }
    }
    return true;
}

function onlyThereInRow(x, y, val) {
    // console.log('%cchecking if it fits in other cells of the same row', 'color:rgb(255, 253, 148);');
    for (let i = 0; i < 9; i++) {
        if (i == x) continue;
        if (fits(i, y, val)) {
            return false;
        }
    }
    return true;
}

function fitsOnlyThere(x, y, val) {
    // console.log('%cchecking if it fits only there', 'color:rgb(0, 240, 248);font-size: 20px; font-weight: bold');

    let inSquare = onlyThereInSquare(x, y, val);

    let inRow = onlyThereInRow(x, y, val);

    let inCol = onlyThereInColumn(x, y, val);

    // console.log('%cfinished checking if it fits only there', 'color:rgb(0, 240, 248);font-size: 20px; font-weight: bold');
    // console.log({ inSquare, inRow, inCol });
    return inSquare || inRow || inCol;
}

function perfectFit(x, y, val) {
    if (matrix[y][x] != 0) return false;
    return fits(x, y, val) && fitsOnlyThere(x, y, val);
}




function setVal(x, y, val) {
    const $div = $tds.eq(y * 9 + x).find('div');
    $div.click();
    var e = jQuery.Event("keydown", {
        key: val.toString(),
        code: "Digit" + val,
        keyCode: 48 + val,
        which: 48 + val
    });

    $div.trigger(e);
    matrix[y][x] = val;
}


let reGuessing = 0;

function solve() {
    reset();
    let completed = true;
    do {
        let solvedCellsBefore = 0;
        matrix.forEach(row => row.forEach(cell => solvedCellsBefore += cell ? 1 : 0));
        completed = true;
        run();
        for (let i = 0; i < 9; i++) {
            if (matrix[i].includes(0)) {
                completed = false;
                break;
            }
        }
        if (completed) {
            break;
        }
        let solvedCellsAfter = 0;
        matrix.forEach(row => row.forEach(cell => solvedCellsAfter += cell ? 1 : 0));
        if (solvedCellsAfter <= solvedCellsBefore) {
            // extreme mode: on
            guess();
        }
        solvedCellsAfter = 0;
        matrix.forEach(row => row.forEach(cell => solvedCellsAfter += cell ? 1 : 0));
        if (solvedCellsAfter <= solvedCellsBefore) {
            reGuessing++;
            reset();
        }
    } while (!completed);
    console.log(reGuessing);
}

function run() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let val = 1; val <= 9; val++) {
                // console.log('%cchecking for fit ', 'color:rgb(115, 255, 0)');
                // console.log({ x: j, y: i, val });
                if (perfectFit(j, i, val)) {
                    // console.log('%cit fits', 'font-size: 30px; color:goldenrod;');
                    // console.log({ x: j, y: i, val });
                    setVal(j, i, val);
                }
            }
        }
    }
}

function guess(guessChance = 10) {
    if (guessChance == 0) return;
    let hasGuessed = false;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let val = 1; val <= 9; val++) {
                // console.log('%cchecking for fit ', 'color:rgb(115, 255, 0)');
                // console.log({ x: j, y: i, val });
                if (fits(j, i, val)) {
                    if (Math.ceil(Math.random() * 10) >= guessChance) {
                        hasGuessed = true;
                        // one in ten goes
                        // console.log('%cguessing', 'font-size: 30px; color:goldenrod;');
                        // console.log({ x: j, y: i, val });
                        setVal(j, i, val);
                        return;
                    }
                }
            }
        }
    }
    if (!hasGuessed) {
        guess(guessChance - 1);
    }
}