function main(width, height) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  var width = canvas.getAttribute('width');
  var height = canvas.getAttribute('height');
  var board = new GameOfLifeBoard(width, height);
  var interval = setInterval(function () { gameLoop(ctx, canvas, board); }, 500);
  document.getElementById("reset").addEventListener("click", function () {
    clearInterval(interval);
    width = canvas.getAttribute('width');
    height = canvas.getAttribute('height');
    board = new GameOfLifeBoard(width, height);
    interval = setInterval(function () { gameLoop(ctx, canvas, board); }, 500);
  });
}

function gameLoop(ctx, canvas, board) {
  board.updateCells();
  board.updateBoardSize(canvas);
  board.drawBoard(ctx);
}

class GameOfLifeBoard {
  width;
  height;
  cellWidth;
  cellHeight;
  board;
  constructor(width, height) {
    console.log('board Init')
    this.width = width;
    this.height = height;
    this.cellWidth = width / 30;
    this.cellHeight = height / 13;
    this.board = [];
    for (var c = 0; c < 30; c++) {
      this.board.push([]);
      for (var r = 0; r < 13; r++) {
        var cell = new Cell(r, c, Math.random() < 0.50);
        this.board[c].push(cell);
      }
    }
  }
  updateCells() {
    for (var c = 0; c < 30; c++) {
      for (var r = 0; r < 13; r++) {
        this.board[c][r].countAliveNeighbors(this.board);
      }
    }
    for (var c = 0; c < 30; c++) {
      for (var r = 0; r < 13; r++) {
        this.board[c][r].updateAlive();
      }
    }
  }
  updateBoardSize(canvas) {
    var width = canvas.getAttribute('width');
    var height = canvas.getAttribute('height');
    this.width = width;
    this.height = height;
    this.cellWidth = width / 30;
    this.cellHeight = height / 13;
  }
  drawBoard(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, this.width, this.height)
    for (var c = 0; c < 30; c++) {
      for (var r = 0; r < 13; r++) {
        this.board[c][r].draw(ctx, this.cellWidth, this.cellHeight);
      }
    }
  }


}

class Cell {
  aliveNeighbors;
  colors = ['#FFFFFF', '#F7D3AC', '#EEA659', '#D38066', '#B85972', '#AB4678', '#9D327E', '#901F84', '#820B8A'];
  alive;
  row;
  column;
  constructor(row, column, alive) {
    this.row = row;
    this.column = column;
    this.alive = alive;
    this.aliveNeighbors = 0;
  }
  countAliveNeighbors(board) {
    this.aliveNeighbors = 0;
    for (var c = this.column - 1; c <= this.column + 1; c++) {
      for (var r = this.row - 1; r <= this.row + 1; r++) {
        if (r == this.row && c == this.column) {
        } else {
          if (r >= 0 && r < 13 && c >= 0 && c < 30) {
            if (board[c][r].alive == true) {
              this.aliveNeighbors++;
            }
          }
        }
      }
    }
  }
  updateAlive() {
    if (this.alive == true) {
      if (this.aliveNeighbors == 2 || this.aliveNeighbors == 3) {
        this.alive = true;
      } else {
        this.alive = false;
      }
    } else {
      if (this.aliveNeighbors == 3) {
        this.alive = true;
      }
    }
  }
  draw(ctx, cellWidth, cellHeight) {
    var color = this.colors[0];
    if (this.alive) {
      color = this.colors[this.aliveNeighbors + 1];
    }
    ctx.fillStyle = color;
    ctx.fillRect((cellWidth * this.column) + (cellWidth / 10), (cellHeight * this.row) + (cellHeight / 10), (cellWidth) - (cellWidth / 10), (cellHeight) - (cellHeight / 10));
  }
}

main()