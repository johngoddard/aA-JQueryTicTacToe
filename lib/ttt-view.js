let View = function (game, $el) {
  this.game = game;
  this.$el = $el;
};

View.prototype.bindEvents = function () {
  let view = this;
  $('.unfilled').on('click', event => {
    let $curr = $(event.currentTarget);
    if($curr.hasClass("filled")){
      alert("Invalid move!");
    } else{
      view.makeMove($curr);
    }
  });
};

View.prototype.makeMove = function ($square) {
  let pos = $square.data("pos");
  let currentMark = this.game.currentPlayer;

  this.game.playMove(pos);
  $square.removeClass("unfilled").addClass(`filled ${currentMark}`);
  $square.text(currentMark);
  if (this.game.winner()) {
    let $winText = $(`<p>You win, ${currentMark}!</p>`);
    this.$el.append($winText);
    this.endGame(currentMark);
  }
};
View.prototype.endGame = function (winnerMark) {
  $('li').off("click");
  $('.unfilled').removeClass("unfilled").addClass("filled");
  $(`.${winnerMark}`).css('background', 'green');

};

View.prototype.setupBoard = function () {
  const ulTags = $('<ul></ul>');
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      let $li = $('<li></li>').addClass('unfilled');
      $li.data("pos", [i, j]);
      ulTags.append($li);
    }
  }
  this.$el.append(ulTags);
};

module.exports = View;
