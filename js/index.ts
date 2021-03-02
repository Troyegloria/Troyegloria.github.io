let cells=document.querySelectorAll('.cell');
let gameBord=document.querySelector('.bord');
let mask=document.querySelector('.mask') as HTMLDivElement;
let result=document.querySelector('.result') as HTMLParagraphElement;
let reset=document.querySelector('#reset') as HTMLButtonElement
let arrWin=[[0,1,2],[3,4,5],[6,7,8],[0,3,6,],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
//let steps=0;
let steps:number
enum Play{
    X='dog',
    Y='ele'
}
let currentPlayer:Play;
//currentPlayer=Play.X;
/* cells.forEach(function(item){
    let cell=item as HTMLDivElement
    cell.addEventListener('click',playit,{once:true}) 
    })  */
reset.addEventListener('click',startGame)
startGame()
function startGame(){
    mask.style.display='none'
    steps=0
    currentPlayer=Play.X
    gameBord.classList.remove(Play.X,Play.Y)
    gameBord.classList.add(Play.X)
    cells.forEach(function(item){
        let cell=item as HTMLDivElement
        cell.classList.remove(Play.X,Play.Y)
        cell.removeEventListener('click',playit)
        cell.addEventListener('click',playit,{once:true})
    })
}
function playit(event:MouseEvent){
        let target=event.target as HTMLDivElement
        target.classList.add(currentPlayer)
        steps++
        let isWin=checkWinner(currentPlayer)
        if(isWin){
            mask.style.display='block'
            result.innerText=currentPlayer+' 赢了！'
            cells.forEach(function(item){
                let cell=item as HTMLDivElement;
                cell.removeEventListener('click',playit)
            })
            return            
        }
        if(steps===9){
            mask.style.display='block'
            result.innerText='平局'
            return
        }
        currentPlayer=currentPlayer==='dog'?Play.Y:Play.X
        gameBord.classList.remove(Play.X,Play.Y);
        gameBord.classList.add(currentPlayer)
    }

function checkWinner(play:Play):boolean{
    return arrWin.some(function(item){
        let cellIndex1=item[0]
        let cellIndex2=item[1]
        let cellIndex3=item[2]
        if(
            hasClass(cells[cellIndex1],play)&&hasClass(cells[cellIndex2],play)&&hasClass(cells[cellIndex3],play)
            // cells[cellIndex1].classList.contains(play)&&cells[cellIndex2].classList.contains(play)&&cells[cellIndex3].classList.contains(play)
        ){
            return true
        }
            return false
        })
}
function hasClass(el:Element,name:string){
    return el.classList.contains(name)
}

