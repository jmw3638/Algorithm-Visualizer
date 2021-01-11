export function recursiveDevision(rows, cols) {
    var grid = [];
    for (var r = 0; r < rows; r++) {
        var curRow = [];
        for (var c = 0; c < cols; c++) {
            curRow.push(false);
        }
        grid.push(curRow);
    }

    //grid = innerWalls(grid, true, 0, grid.length-1, 0, grid[0].length-1);
    grid = buildWalls(grid);
    return grid;
}

function buildWalls(grid) {
    for (var r = 0; r < grid.length; r++) {
        if (r === 0 || r === (grid.length-1)) {
            for (var c = 0; c < grid[0].length; c++) {
                grid[r][c] = true;
            }
        } else {
            grid[r][0] = true;
            grid[r][grid[0].length-1] = true;
        }
    }

    grid = innerWalls(grid, true, 1, grid.length-2, 1, grid[0].length-2);
    return grid;
}

function innerWalls(grid, h, minR, maxR, minC, maxC) {
    if (h) {
        if (maxC - minC <= 2) { return grid; }

        var y = Math.floor(random(minR, maxR)/2)*2;
        grid = addHWall(grid, minC, maxC, y);

        //grid = innerWalls(grid, !h, minR, maxR, minC, y-1);
        //grid = innerWalls(grid, !h, minR, maxR, y+1, maxC);
    } else {
        if (maxR - minR <= 2) { return grid; }

        var x = Math.floor(random(minC, maxC)/2)*2;
        grid = addVWall(grid, minR, maxR, x);

        //grid = innerWalls(grid, !h, minR, x-1, minC, maxC);
        //grid = innerWalls(grid, !h, x+1, maxR, minC, maxC);
    }
    return grid;
}

function addHWall(grid, minC, maxC, r) {
    var hole = Math.floor(random(minC, maxC)/2)*2+1;
    for (var i = minC; i <= maxC; i++) {
        if (i === hole) grid[r][i] = false;
        else grid[r][i] = true;
    }
    return grid;
}

function addVWall(grid, minR, maxR, c) {
    var hole = Math.floor(random(minR, maxR)/2)*2+1;
    for (var i = minR; i <= maxR; i++) {
        if (i === hole) grid[i][c] = false;
        else grid[i][c] = true;
    }
    return grid;
}

function random(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }