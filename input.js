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