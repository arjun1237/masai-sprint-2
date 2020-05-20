window.addEventListener("load", createChess);

var piece_name = ["rook", "knight", "bishop", "queen", "king", "pawn"];

initial_pos = {
    top: 20,
    left: 20,
};

// for padding multiplication
colRowInfo = {
    rows: {
        "1": 7,
        "2": 6,
        "3": 5,
        "4": 4,
        "5": 3,
        "6": 2,
        "7": 1,
        "8": 0,
    },

    cols: {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": 4,
        "e": 5,
        "f": 6,
        "g": 7,
        "h": 8,
    },
};

pieceInfo = {
    // main pieces

    black_pieces: {
        // main pieces

        rook_left: {
            initital: ["a", "8"],
            current: ["a", "8"],
        },
        rook_right: {
            initital: ["h", "8"],
            current: ["h", "8"],
        },
        knight_left: {
            initital: ["b", "8"],
            current: ["b", "8"],
        },
        knight_right: {
            initital: ["g", "8"],
            current: ["g", "8"],
        },
        bishop_left: {
            initital: ["c", "8"],
            current: ["c", "8"],
        },
        bishop_right: {
            initital: ["f", "8"],
            current: ["f", "8"],
        },
        queen: {
            initital: ["d", "8"],
            current: ["d", "8"],
        },
        king: {
            initital: ["e", "8"],
            current: ["e", "8"],
        },

        // pawns

        pawn_1: {
            initital: ["a", "7"],
            current: ["a", "7"],
            firstMoveComplete: false,
        },
        pawn_2: {
            initital: ["b", "7"],
            current: ["b", "7"],
            firstMoveComplete: false,
        },
        pawn_3: {
            initital: ["c", "7"],
            current: ["c", "7"],
            firstMoveComplete: false,
        },
        pawn_4: {
            initital: ["d", "7"],
            current: ["d", "7"],
            firstMoveComplete: false,
        },
        pawn_5: {
            initital: ["e", "7"],
            current: ["e", "7"],
            firstMoveComplete: false,
        },
        pawn_6: {
            initital: ["f", "7"],
            current: ["f", "7"],
            firstMoveComplete: false,
        },
        pawn_7: {
            initital: ["g", "7"],
            current: ["g", "7"],
            firstMoveComplete: false,
        },
        pawn_8: {
            initital: ["h", "7"],
            current: ["h", "7"],
            firstMoveComplete: false,
        },
    },

    red_pieces: {
        // main pieces

        rook_left: {
            initital: ["a", "1"],
            current: ["a", "1"],
        },
        rook_right: {
            initital: ["h", "1"],
            current: ["h", "1"],
        },
        knight_left: {
            initital: ["b", "1"],
            current: ["b", "1"],
        },
        knight_right: {
            initital: ["g", "1"],
            current: ["g", "1"],
        },
        bishop_left: {
            initital: ["c", "1"],
            current: ["c", "1"],
        },
        bishop_right: {
            initital: ["f", "1"],
            current: ["f", "1"],
        },
        king: {
            initital: ["e", "1"],
            current: ["e", "1"],
        },
        queen: {
            initital: ["d", "1"],
            current: ["d", "1"],
        },

        // pawns

        pawn_1: {
            initital: ["a", "2"],
            current: ["a", "2"],
            firstMoveComplete: false,
        },
        pawn_2: {
            initital: ["b", "2"],
            current: ["b", "2"],
            firstMoveComplete: false,
        },
        pawn_3: {
            initital: ["c", "2"],
            current: ["c", "2"],
            firstMoveComplete: false,
        },
        pawn_4: {
            initital: ["d", "2"],
            current: ["d", "2"],
            firstMoveComplete: false,
        },
        pawn_5: {
            initital: ["e", "2"],
            current: ["e", "2"],
            firstMoveComplete: false,
        },
        pawn_6: {
            initital: ["f", "2"],
            current: ["f", "2"],
            firstMoveComplete: false,
        },
        pawn_7: {
            initital: ["g", "2"],
            current: ["g", "2"],
            firstMoveComplete: false,
        },
        pawn_8: {
            initital: ["h", "2"],
            current: ["h", "2"],
            firstMoveComplete: false,
        },
    },
};

function createChess() {
    var board = document.getElementsByClassName("chess-board")[0];
    for (var i = 8; i > 0; i--) {
        var row = " row-" + i
        for (var j = 0; j < 8; j++) {
            var col = " col-" + colRowInfo.cols[String.fromCharCode(97+j)]
            var div = document.createElement("div");
            if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) {
                div.setAttribute("class", "chess-cell red-cell" + row + col);
            } else {
                div.setAttribute("class", "chess-cell other-cell" + row + col);
            }
            if(i === 1 || i === 2 || i === 7 || i === 8){
                div.className += ' taken'
            }
            div.addEventListener('click', removeHighlight)
            board.append(div);
        }
    }

    createPieces(true);
    createPieces(false);
}

function createPieces(isred) {
    var cell = document.querySelector(".chess-cell");
    var parent = document.querySelector(".chess-board");

    var pieces1 = createMainPieces();
    var pieces2 = createPawns(8);

    pieces1 = givePositions(pieces1, isred, false);
    pieces2 = givePositions(pieces2, isred, true);

    pieces1 = addEvents(pieces1);
    pieces2 = addEvents(pieces2);

    insertBeforeMany(pieces1, parent, cell);
    insertBeforeMany(pieces2, parent, cell);
}

function addEvents(pieces) {
    for (var i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("click", changePieceBG);
    }
    return pieces;
}

function changePieceBG() {
    removeHighlight()
    event.target.className += " yellow-bg";
}

function removeHighlight(){
    var all_pieces = document.getElementsByClassName("chess-piece-singular");
    for (var i = 0; i < all_pieces.length; i++) {
        var cls = all_pieces[i].className;
        cls = cls.replace(" yellow-bg", "").replace("yellow-bg ", "");
        all_pieces[i].className = cls;
    }
}

function insertBeforeMany(elements, parent, ref) {
    for (var j = 0; j < elements.length; j++) {
        parent.insertBefore(elements[j], ref);
    }
}

function givePositions(pieces, isred, isPawn) {
    var cell = document.getElementsByClassName("chess-cell")[0];
    var height = cell.offsetHeight;
    var width = cell.offsetWidth;
    for (var i = 0; i < pieces.length; i++) {
        var style = pieces[i].style;
        if (!isred) {
            if (isPawn) {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["2"] + "px";
            } else {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["1"] + "px";
            }
            pieces[i].className += " red-color";
        } else {
            if (isPawn) {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["7"] + "px";
            } else {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["8"] + "px";
            }
            pieces[i].className += " black-color";
        }
        style.left = initial_pos.left + width * i + "px";
    }
    return addPadding(pieces, isPawn);
}

function addPadding(pieces, isPawn) {
    if (isPawn) {
        for (var i = 0; i < pieces.length; i++) {
            pieces[i].className += " pawn-padding";
        }
    } else {
        // console.log('here')
        for (var i = 0, j = 0; i < 8; i++) {
            console.log(j);
            if (j == 0 || j == 1) {
                pieces[i].className += " padding-rook-knight";
            } else if (j == 2) {
                pieces[i].className += " bishop-padding";
            } else if (j == 3) {
                pieces[i].className += " padding-queen";
            } else if (j == 4) {
                pieces[i].className += " padding-king";
            }

            if (j == 4) {
                j--;
            }
            if (i < 4) {
                j++;
            } else {
                j--;
            }
        }
    }
    return pieces;
}

function createPawns(num) {
    var pawns = [];
    for (var i = 0; i < num; i++) {
        var pawn = document.createElement("i");
        pawn.className = "fas fa-chess-pawn chess-piece-singular";
        pawns.push(pawn);
    }
    return pawns;
}

function createMainPieces() {
    var pieces = [];
    for (var i = 0; i <= 4; i++) {
        var piece_single = document.createElement("i");
        piece_single.className =
            "fas fa-chess-" + piece_name[i] + " chess-piece-singular";
        pieces.push(piece_single);
    }
    for (var i = 2; i >= 0; i--) {
        var piece_single = document.createElement("i");
        piece_single.className =
            "fas fa-chess-" + piece_name[i] + " chess-piece-singular";
        pieces.push(piece_single);
    }
    return pieces;
}
