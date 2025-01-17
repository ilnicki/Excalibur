

var game = new ex.Engine({
  width: 800,
  height: 600,
  displayMode: ex.DisplayMode.FitScreenAndFill,
  antialiasing: false
});

var image = new ex.ImageSource('/images/heart.png', null, ex.ImageFiltering.Pixel);
var loader = new ex.Loader([image]);

var actor = new ex.Actor({
  width: 50,
  height: 50
});
actor.graphics.use(image.toSprite());
game.add(actor);


var sequence1 = new ex.ActionSequence(actor, ctx => {
  ctx.easeBy(ex.vec(200, 0), 1000, ex.EasingFunctions.EaseInOutCubic);
  ctx.delay(500);
  ctx.easeBy(ex.vec(0, 200), 1000, ex.EasingFunctions.EaseInOutCubic);
  ctx.delay(500);
  ctx.easeBy(ex.vec(-200, 0), 1000, ex.EasingFunctions.EaseInOutCubic);
  ctx.delay(500);
  ctx.easeBy(ex.vec(0, -200), 1000, ex.EasingFunctions.EaseInOutCubic);
  ctx.delay(500);
});

var sequence2 = new ex.ActionSequence(actor, ctx => {
  ctx.rotateBy(Math.PI, Math.PI, ex.RotationType.Clockwise);
  ctx.delay(500);
  ctx.rotateBy(Math.PI, Math.PI, ex.RotationType.CounterClockwise);
  ctx.delay(500);
  ctx.rotateBy(Math.PI, Math.PI, ex.RotationType.Clockwise);
  ctx.delay(500);
  ctx.rotateBy(Math.PI, Math.PI, ex.RotationType.CounterClockwise);
  ctx.delay(500);
});

var sequence3 = new ex.ActionSequence(actor, ctx => {
  ctx.scaleBy(ex.vec(2, 2), 1);
  ctx.delay(1000);
  ctx.scaleBy(ex.vec(-2, -2), 1);
  ctx.delay(1000);
});

var sequence4 = new ex.ActionSequence(actor, ctx => {
  ctx.fade(0, 2000);
  ctx.delay(1000);
  ctx.fade(1, 2000);
  ctx.delay(1000);
});

var blink = new ex.Blink(actor, 200, 200, 2);

var spawn = new ex.ParallelActions([sequence1, sequence2, sequence3, sequence4, blink]);

actor.actions.repeatForever(ctx => ctx.runAction(spawn));
game.currentScene.camera.pos = ex.Vector.Zero;


game.start(loader);