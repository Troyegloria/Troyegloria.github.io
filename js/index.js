var cells = document.querySelectorAll('.cell');
var gameBord = document.querySelector('.bord');
var mask = document.querySelector('.mask');
var result = document.querySelector('.result');
var reset = document.querySelector('#reset');
var arrWin = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6,], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var steps = 0;
var Play;
(function (Play) {
    Play["X"] = "dog";
    Play["Y"] = "ele";
})(Play || (Play = {}));
var currentPlayer;
currentPlayer = Play.X;
cells.forEach(function (item) {
    var cell = item;
    cell.addEventListener('click', playit, { once: true });
});
reset.addEventListener('click', function () {
    mask.style.display = 'none';
    steps = 0;
    cells.forEach(function (item) {
        var cell = item;
        cell.classList.remove(Play.X, Play.Y);
        cell.removeEventListener('click', playit);
        cell.addEventListener('click', playit, { once: true });
    });
});
function playit(event) {
    var target = event.target;
    target.classList.add(currentPlayer);
    steps++;
    var isWin = checkWinner(currentPlayer);
    if (isWin) {
        mask.style.display = 'block';
        result.innerText = currentPlayer + ' 赢了！';
        cells.forEach(function (item) {
            var cell = item;
            cell.removeEventListener('click', playit);
        });
        return;
    }
    if (steps === 9) {
        mask.style.display = 'block';
        result.innerText = '平局';
        return;
    }
    currentPlayer = currentPlayer === 'dog' ? Play.Y : Play.X;
    gameBord.classList.remove(Play.X, Play.Y);
    gameBord.classList.add(currentPlayer);
}
function checkWinner(play) {
    return arrWin.some(function (item) {
        var cellIndex1 = item[0];
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        if (hasClass(cells[cellIndex1], play) && hasClass(cells[cellIndex2], play) && hasClass(cells[cellIndex3], play)
        // cells[cellIndex1].classList.contains(play)&&cells[cellIndex2].classList.contains(play)&&cells[cellIndex3].classList.contains(play)
        ) {
            return true;
        }
        return false;
    });
}
function hasClass(el, name) {
    return el.classList.contains(name);
}
