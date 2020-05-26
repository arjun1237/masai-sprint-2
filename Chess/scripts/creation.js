window.addEventListener("load", createChess);

var piece_name = ["rook", "knight", "bishop", "queen", "king", "pawn"];

initial_pos = {
    top: 20,
    left: 20,
};

// for padding multiplication and other selection
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
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
    },
};

function createChess() {
    var board = document.getElementsByClassName("chess-board")[0];
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var div = document.createElement("div");
            if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) {
                div.setAttribute("class", "chess-cell white-cell");
            } else {
                div.setAttribute("class", "chess-cell green-cell");
            }
            div.id = String.fromCharCode(97 + j) + (8 - i);
            if (i === 0 || i === 1 || i === 6 || i === 7) {
                div.classList.add("taken");
            }
            div.addEventListener("click", removeHighlight);
            board.append(div);
        }
    }

    createPieces(true);
    createPieces(false);
}

function createPieces(isred) {
    var cell = document.querySelector(".chess-cell");
    var parent = document.querySelector(".chess-board");

    var pieces1 = createMainPieces(isred);
    var pieces2 = createPawns(8, isred);

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
    removeHighlight();
    event.target.classList.add("yellow-bg");
}

function removeHighlight() {
    var all_pieces = document.getElementsByClassName("chess-piece-singular");
    for (var i = 0; i < all_pieces.length; i++) {
        all_pieces[i].classList.remove("yellow-bg");
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

        // for blacks
        if (!isred) {
            if (isPawn) {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["7"] + "px";
            } else {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["8"] + "px";
            }
            pieces[i].classList.add("black-color");
        }

        // for reds
        else {
            if (isPawn) {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["2"] + "px";
            } else {
                style.top =
                    initial_pos.top + height * colRowInfo.rows["1"] + "px";
            }
            pieces[i].classList.add("red-color");
        }

        style.left = initial_pos.left + width * i + "px";
    }
    return addPadding(pieces, isPawn);
}

function addPadding(pieces, isPawn) {
    if (isPawn) {
        for (var i = 0; i < pieces.length; i++) {
            pieces[i].classList.add("pawn-padding");
        }
    } else {
        // console.log('here')
        for (var i = 0, j = 0; i < 8; i++) {
            // console.log(j);
            if (j == 0 || j == 1) {
                pieces[i].classList.add("padding-rook-knight");
            } else if (j == 2) {
                pieces[i].classList.add("bishop-padding");
            } else if (j == 3) {
                pieces[i].classList.add("padding-queen");
            } else if (j == 4) {
                pieces[i].classList.add("padding-king");
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

function createPawns(num, isRed) {
    var pawns = [];
    for (var i = 0; i < num; i++) {
        var pawn = document.createElement("i");
        pawn.className = "fas fa-chess-pawn chess-piece-singular";
        pawn.setAttribute(
            "data-info",
            (isRed ? "red" : "black") + "-pawn-" + (i + 1)
        );
        pawns.push(pawn);
    }
    return pawns;
}

function createMainPieces(isRed) {
    var pieces = [];
    for (var i = 0; i <= 4; i++) {
        var piece_single = document.createElement("i");
        piece_single.classList.add(
            "fas",
            "fa-chess-" + piece_name[i],
            "chess-piece-singular"
        );
        var data =
            (isRed ? "red-" : "black-") +
            piece_name[i] +
            (i < 3 ? "-left" : "");
        piece_single.setAttribute("data-info", data);
        pieces.push(piece_single);
    }
    for (var i = 2; i >= 0; i--) {
        var piece_single = document.createElement("i");
        piece_single.classList.add(
            "fas",
            "fa-chess-" + piece_name[i],
            "chess-piece-singular"
        );
        var data = (isRed ? "red-" : "black-") + piece_name[i] + "-right";
        piece_single.setAttribute("data-info", data);
        pieces.push(piece_single);
    }
    return pieces;
}
