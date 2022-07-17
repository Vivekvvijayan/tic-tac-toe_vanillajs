const board = document.querySelector('.board');
const cell = document.querySelectorAll('.cell')

let space = ['', '', '', '', '', '', '', '', ''];
let tik_x = 'X'
let tik_o = 'O'
let CURRENT_PLAYER = tik_x;
let i;
let strikeClass = ''

let isWinned = false;
const audio = new Audio();



cell.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
        if (e.target.innerText === '') {
            e.target.style.color = 'gray';
            e.target.innerText = CURRENT_PLAYER;
            
        }

    })

    cell.addEventListener('mouseout', (e) => {
        if (!space[e.target.id]) {
            e.target.innerText = '';
        }


    })
    cell.addEventListener('click', drawTic)
})


function drawTic(e) {

    const id = e.target.id;

    if (!space[id]) {
        space[id] = CURRENT_PLAYER;
        e.target.style.color = '#fff';
        e.target.innerText = CURRENT_PLAYER;
        
       CURRENT_PLAYER === tik_x ? playAudio(Tones.X_MOVE) :playAudio(Tones.O_MOVE);
        audio.play();

        if (checkWin()) {

            isWinned = true;
            playAudio(Tones.WIN)
            showPopup(CURRENT_PLAYER)

        }

        if (checkDraw()) {
            playAudio(Tones.DRAW)
            showPopup()

        }

    }
    toggleHeaderPlayer()
    togglePlayer()

}



function togglePlayer() {

    return CURRENT_PLAYER = CURRENT_PLAYER === tik_x ? tik_o : tik_x;

}

function checkRow() {


    for (i = 0; i <= 6; i += 3) {
        if (space[i] === space[i + 1] && space[i] === space[i + 2] && space[i] !== '') {
            strikeClass = 'strike-row'
            addStrike(i, i + 1, i + 2, strikeClass)
            return true;
        }
    }
    return false
}


function checkCol() {

    for (i = 0; i < 3; i++) {
        if (space[i] === space[i + 3] && space[i] === space[i + 6] && space[i] !== '') {
            strikeClass = 'strike-col'
            console.log(i, i + 6)
            addStrike(i, i + 3, i + 6, strikeClass)
            return true
        }
    }
    return false
}

function checkDiag() {

    if (space[0] === space[4] && space[0] === space[8] && space[4] != '') {
        strikeClass = 'strike-diag-1'
        addStrike(0, 4, 8, strikeClass)

        return true;
    }

    if (space[2] === space[4] && space[2] === space[6] && space[4] !== '') {
        strikeClass = 'strike-diag-2'
        addStrike(2, 4, 6, strikeClass)
        return true
    }
    return false;

}
function checkWin() {

    return checkRow() || checkCol() || checkDiag();


}


function checkDraw() {
    let count = 0;
    space.forEach((element, i) => {

        if (element !== '') {

            count++;
        }
    })

    return count === 9;
}

function restart() {

    space = ['', '', '', '', '', '', '', '', '']
    cell.forEach(cel => {

        cel.innerText = '';


    })
    removeStrike(strikeClass)
    togglePlayer()
    isWinned = false
}


function addStrike(i, j, k, addClass) {

    cell.forEach((cel, index) => {

        if (index === i || index === j || index === k) {


            cel.classList.add(addClass)
            cel.style.color = '#adefd1'


        }


    })

}


function removeStrike(addClass) {

    cell.forEach((cel) => {
        cel.classList.remove(addClass)
    })

}


function showPopup(CURRENT_PLAYER) {

    const popup = document.querySelector('.popup-box')
    let winner_header = document.querySelector('.winner-name')
    let pop_up_box_head = document.querySelector('.pop-up-box-head')
    const btnPlayAgain = document.querySelector('.btn-play-again')
    popup.style.display = 'block'
    


    isWinned ? (winner_header = CURRENT_PLAYER, pop_up_box_head = 'WINNER') : (winner_header.innerText = 'Draw', pop_up_box_head.innerText = '');

    return;



}

function hidePopup() {

    const popup = document.querySelector('.popup-box')
    popup.style.display = 'none';
    restart()
}


function toggleHeaderPlayer() {

    const headerPlayer1 = document.querySelector('.player-1')
    const headerPlayer2 = document.querySelector('.player-2')
    if (CURRENT_PLAYER === tik_x) {
        headerPlayer1.classList.add('active')
        headerPlayer2.classList.remove('active')
    } else {
        headerPlayer2.classList.add('active')
        headerPlayer1.classList.remove('active')
    }


}


function playAudio( src ) {

    audio.src = src;
    audio.play()
}



