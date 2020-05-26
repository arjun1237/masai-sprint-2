var colNames = "abcdefgh";

pieceInfo = {
    black_pieces: {
        // main pieces

        rook_left: {
            initital: ["a8"],
            current: ["a8"],
        },
        rook_right: {
            initital: ["h8"],
            current: ["h8"],
        },
        knight_left: {
            initital: ["b8"],
            current: ["b8"],
        },
        knight_right: {
            initital: ["g8"],
            current: ["g8"],
        },
        bishop_left: {
            initital: ["c8"],
            current: ["c8"],
        },
        bishop_right: {
            initital: ["f8"],
            current: ["f8"],
        },
        queen: {
            initital: ["d8"],
            current: ["d8"],
        },
        king: {
            initital: ["e8"],
            current: ["e8"],
        },

        // pawns

        pawn_1: {
            initital: ["a7"],
            current: ["a7"],
        },
        pawn_2: {
            initital: ["b7"],
            current: ["b7"],
        },
        pawn_3: {
            initital: ["c7"],
            current: ["c7"],
        },
        pawn_4: {
            initital: ["d7"],
            current: ["d7"],
        },
        pawn_5: {
            initital: ["e7"],
            current: ["e7"],
        },
        pawn_6: {
            initital: ["f7"],
            current: ["f7"],
        },
        pawn_7: {
            initital: ["g7"],
            current: ["g7"],
        },
        pawn_8: {
            initital: ["h7"],
            current: ["h7"],
        },
    },

    red_pieces: {
        // main pieces

        rook_left: {
            initital: ["a1"],
            current: ["a1"],
        },
        rook_right: {
            initital: ["h1"],
            current: ["h1"],
        },
        knight_left: {
            initital: ["b1"],
            current: ["b1"],
        },
        knight_right: {
            initital: ["g1"],
            current: ["g1"],
        },
        bishop_left: {
            initital: ["c1"],
            current: ["c1"],
        },
        bishop_right: {
            initital: ["f1"],
            current: ["f1"],
        },
        king: {
            initital: ["e1"],
            current: ["e1"],
        },
        queen: {
            initital: ["d1"],
            current: ["d1"],
        },

        // pawns

        pawn_1: {
            initital: ["a2"],
            current: ["a2"],
        },
        pawn_2: {
            initital: ["b2"],
            current: ["b2"],
        },
        pawn_3: {
            initital: ["c2"],
            current: ["c2"],
        },
        pawn_4: {
            initital: ["d2"],
            current: ["d2"],
        },
        pawn_5: {
            initital: ["e2"],
            current: ["e2"],
        },
        pawn_6: {
            initital: ["f2"],
            current: ["f2"],
        },
        pawn_7: {
            initital: ["g2"],
            current: ["g2"],
        },
        pawn_8: {
            initital: ["h2"],
            current: ["h2"],
        },
    },
};

previousProjections = [];

function getRookMoves(current, isRed) {
    var moves = [];

    // rows - top to bottom
    for (var i = 1; i <= 8; i++) {
        // no pushing if current row is equal to i
        if (Number(current[1]) === i) {
            continue;
        }
        moves.push(current[0] + i);
    }

    // columns - left to right
    for (var i = 0; i < colNames.length; i++) {
        // no pushing if current column is equal to i
        if (colNames[i] === current[0]) {
            continue;
        }
        moves.push(colNames[i] + current[1]);
    }

    return filterMoves(moves, isRed);
}

function getQueenMoves(current, isRed) {
    var bishopMoves = getBishopMoves(current, isRed);
    var rookMoves = getRookMoves(current, isRed);

    return [...bishopMoves, ...rookMoves];
}

// castling needs to be implemented
function getKingMoves(current, isRed) {
    var moves = [];
    var curCol = current[0];
    var col = colNames.indexOf(curCol);
    var row = Number(current[1]);

    var nxtCol = colNames.charAt(col + 1);
    var prevCol = colNames.charAt(col - 1);
    var nxtRow = row + 1;
    var prevRow = row - 1;

    // right side - top, bottom and center
    if (nxtCol !== "") {
        moves.push(nxtCol + row); // right-center
        if (nxtRow <= 8) {
            moves.push(nxtCol + nxtRow); // right-top
        }
        if (prevRow > 0) {
            moves.push(nxtCol + prevRow); // right-bottom
        }
    }

    // left side - top, right and center
    if (prevCol !== "") {
        moves.push(prevCol + row); // left-center
        if (prevRow > 0) {
            moves.push(prevCol + prevRow); // left-bottom
        }
        if (nxtRow <= 8) {
            moves.push(prevCol + nxtRow); // left-top
        }
    }

    // center top
    if (nxtRow <= 8) {
        moves.push(curCol + nxtRow);
    }

    // center bottom
    if (prevRow > 0) {
        moves.push(curCol + prevRow);
    }

    return filterMoves(moves, isRed);
}

function getKnightMoves(current, isRed) {
    var moves = [];
    var row = current[1];
    var col = current[0];
    var colNum = colNames.indexOf(col);
    var nxtCol = colNames.charAt(colNum + 1);
    var prevCol = colNames.charAt(colNum - 1);
    var nxtNxtCol = colNames.charAt(colNum + 2);
    var prevPrevCol = colNames.charAt(colNum - 2);

    for (var i = row - 2, j = 0; j <= 4; i++, j++) {
        if (j == 2) {
            continue;
        }
        if (i > 0 && i <= 8) {
            if (j === 0 || j == 4) {
                if (nxtCol !== "") {
                    moves.push(nxtCol + i);
                }
                if (prevCol !== "") {
                    moves.push(prevCol + i);
                }
            }
            if (j == 1 || j == 3) {
                if (nxtNxtCol !== "") {
                    moves.push(nxtNxtCol + i);
                }
                if (prevPrevCol !== "") {
                    moves.push(prevPrevCol + i);
                }
            }
        }
    }

    return filterMoves(moves, isRed);
}

function getBishopMoves(current, isRed) {
    var moves = [];
    var col = colNames.indexOf(current[0]);
    var row = Number(current[1]);
    var len = colNames.length;

    // right side moves
    for (var i = col + 1, j = row + 1, k = row - 1; i < len; i++, k--, j++) {
        var current_col = colNames.charAt(i);

        // right top
        if (j <= 8) {
            moves.push(current_col + j);
        }

        // right bottom
        if (k > 0) {
            moves.push(current_col + k);
        }
    }

    // left side moves
    for (var i = col - 1, j = row + 1, k = row - 1; i >= 0; i--, k--, j++) {
        var current_col = colNames.charAt(i);

        // left top
        if (j <= 8) {
            moves.push(current_col + j);
        }

        // left bottom
        if (k > 0) {
            moves.push(current_col + k);
        }
    }

    return filterMoves(moves, isRed);
}

// en passant needs to be implemented
function getPawnMoves(current, isRed) {
    var moves = [];
    var row = Number(current[1]);
    var col = current[0];

    // the pawn only moves forward. so the red pawn in row 1 or black pawn in row 8 is no possibility, so we move on
    if ((row === 1 && isRed) || (row === 8 && !isRed)) {
        return filterMoves(moves, isRed);
    }

    // forward rows as per color type
    var nxtRow = isRed ? row + 1 : row - 1;

    if ((nxtRow <= 8 && isRed) || (!isRed && nxtRow > 0)) {
        // forward center
        moves.push(col + nxtRow);

        var colNum = colNames.indexOf(col);
        var nxtCol = colNames.charAt(colNum + 1);
        var prevCol = colNames.charAt(colNum - 1);

        // forward right for red, left for black
        if (nxtCol !== "") {
            moves.push(nxtCol + nxtRow);
        }

        // forward left for red, right for black
        if (prevCol !== "") {
            moves.push(prevCol + nxtRow);
        }
    }

    var nxtNxtRow = isRed ? row + 2 : row - 2;

    // checking if its pawns first move - if its in initial rows, it means it hasn't moved. Then it gets an extra 2 row forward move
    if ((row === 2 && isRed) || (!isRed && row === 7)) {
        moves.push(col + nxtNxtRow);
    }

    // checking for En Passant
    if (row === 5 && isRed && !isRed && row === 4) {
        // implement en passant
    }

    return filterMoves(moves, isRed);
}

function filterMoves(moves, isRed) {
    // projectMoves(moves)
    return moves;
}

// removes all highlights of moves
function removeProjections() {
    for (var i = 0; i < previousProjections.length; i++) {
        document
            .getElementById(previousProjections[i])
            .classList.remove("moves-highlight");
    }
}

// highlights the moves passed to it
function projectMoves(moves) {
    removeProjections();
    for (var i = 0; i < moves.length; i++) {
        document.getElementById(moves[i]).classList.add("moves-highlight");
    }
    previousProjections = [...moves];
}
