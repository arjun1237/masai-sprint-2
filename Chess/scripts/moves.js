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
            firstMoveComplete: false,
        },
        pawn_2: {
            initital: ["b7"],
            current: ["b7"],
            firstMoveComplete: false,
        },
        pawn_3: {
            initital: ["c7"],
            current: ["c7"],
            firstMoveComplete: false,
        },
        pawn_4: {
            initital: ["d7"],
            current: ["d7"],
            firstMoveComplete: false,
        },
        pawn_5: {
            initital: ["e7"],
            current: ["e7"],
            firstMoveComplete: false,
        },
        pawn_6: {
            initital: ["f7"],
            current: ["f7"],
            firstMoveComplete: false,
        },
        pawn_7: {
            initital: ["g7"],
            current: ["g7"],
            firstMoveComplete: false,
        },
        pawn_8: {
            initital: ["h7"],
            current: ["h7"],
            firstMoveComplete: false,
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
            firstMoveComplete: false,
        },
        pawn_2: {
            initital: ["b2"],
            current: ["b2"],
            firstMoveComplete: false,
        },
        pawn_3: {
            initital: ["c2"],
            current: ["c2"],
            firstMoveComplete: false,
        },
        pawn_4: {
            initital: ["d2"],
            current: ["d2"],
            firstMoveComplete: false,
        },
        pawn_5: {
            initital: ["e2"],
            current: ["e2"],
            firstMoveComplete: false,
        },
        pawn_6: {
            initital: ["f2"],
            current: ["f2"],
            firstMoveComplete: false,
        },
        pawn_7: {
            initital: ["g2"],
            current: ["g2"],
            firstMoveComplete: false,
        },
        pawn_8: {
            initital: ["h2"],
            current: ["h2"],
            firstMoveComplete: false,
        },
    },
};

previousProjections = []


function getRookMoves(current, isRed){
    current = current.split('')
    var moves = []
    for(var i=1; i<=8; i++){
        if(Number(current[1]) === i){
            continue
        }
        moves.push(current[0] + i)
    }

    var str = 'abcdefgh'
    for(var i=0; i<str.length; i++){
        if(str[i] === current[0]){
            continue
        }
        moves.push(str[i] + current[1])
    }

    return filterMoves(moves, isRed)
}

function getQueenMoves(current, isRed){
}

function getKingMoves(current, isRed){

}

function getKnightMoves(current, isRed){
}

function getBishopMoves(current, isRed){
    moves = []
    var str = 'abcdefgh'
    var index = str.indexOf(current[0])
    var char = str.charAt(index-Number(current[1])+1)
    for(var i=1; i<=8; i++){
        
    }
    return moves
}

function getPawnMoves(current, isRed, isFirstMove){
    
}

function filterMoves(moves, isRed){
    projectMoves(moves)
    return moves
}

function removeProjections(){
    for(var i=0; i<previousProjections.length; i++){
        var elem = document.getElementById(previousProjections[i])
        elem.className = elem.className.replace(' moves-highlight', '').replace('moves-highlight ', '')
    }
}

function projectMoves(moves){
    removeProjections()
    for(var i =0; i<moves.length; i++){
        var elem = document.getElementById(moves[i])
        elem.className += ' moves-highlight'
    }
    previousProjections = [...moves]
}