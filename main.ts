namespace SpriteKind {
    export const Head = SpriteKind.create()
    export const Body = SpriteKind.create()
    export const BonusFood = SpriteKind.create()
    export const notsnake = SpriteKind.create()
}
namespace StatusBarKind {
    export const BonusBar = StatusBarKind.create()
}
function Score_setup () {
    Numscore = 0
    if (blockSettings.exists("Hi")) {
        Numhiscore = blockSettings.readNumber("Hi")
    } else {
        Numhiscore = 0
    }
    Score = textsprite.create("score:" + Numscore, 9, 1)
    Hiscore = textsprite.create("Hiscore:" + Numhiscore, 9, 1)
    Score.setPosition(40, 4)
    Hiscore.setPosition(112, 4)
}
sprites.onOverlap(SpriteKind.Head, SpriteKind.Food, function (sprite, otherSprite) {
    Snakelenght += 1
    Numscore = Numscore + randint(1, 2)
    Body.unshift(sprites.create(img`
        b b b b b b b c 
        b c c c c c c f 
        b c c c c c c f 
        b c c c c c c f 
        b c c c c c c f 
        b c c c c c c f 
        b c c c c c c f 
        c f f f f f f f 
        `, SpriteKind.Body))
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile0`)
    if (Snakelenght >= 200) {
        game.over(true)
    }
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 718, 553, 95, 255, 150, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Body, SpriteKind.BonusFood, function (sprite, otherSprite) {
    tiles.placeOnTile(Bonus, tiles.getTileLocation(randint(1, 17), randint(1, 12)))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    blockSettings.clear()
    game.reset()
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (!(Hdir == 0)) {
        Hdir = 180
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (!(Hdir == 270)) {
        Hdir = 90
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (!(Hdir == 90)) {
        Hdir = 270
    }
})
sprites.onOverlap(SpriteKind.Head, SpriteKind.Body, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Body, SpriteKind.Food, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile0`)
})
sprites.onOverlap(SpriteKind.Head, SpriteKind.BonusFood, function (sprite, otherSprite) {
    Eated = true
    Numscore = Numscore + Bonusnumscore
    Max_length += 5
    BonusBar.destroy()
    otherSprite.destroy()
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 1728, 2526, 0, 255, 150, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (!(Hdir == 180)) {
        Hdir = 0
    }
})
scene.onOverlapTile(SpriteKind.Head, assets.tile`myTile`, function (sprite, location) {
    if (Head.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
        game.over(false)
    }
})
let BonusBar: StatusBarSprite = null
let Bonusnumscore = 0
let Bonus: Sprite = null
let Hiscore: TextSprite = null
let Score: TextSprite = null
let Numhiscore = 0
let Numscore = 0
let Snakelenght = 0
let Eated = false
let Hdir = 0
let Body: Sprite[] = []
let Head: Sprite = null
tiles.loadMap(tiles.createSmallMap(tilemap`level1`))
Head = sprites.create(img`
    d d d d d d d b 
    d b b b b b b c 
    d b b c c b b c 
    d b c b b d b c 
    d b c b b d b c 
    d b b d d b b c 
    d b b b b b b c 
    b c c c c c c c 
    `, SpriteKind.Head)
Body = [sprites.create(img`
    b b b b b b b c 
    b c c c c c c f 
    b c c c c c c f 
    b c c c c c c f 
    b c c c c c c f 
    b c c c c c c f 
    b c c c c c c f 
    c f f f f f f f 
    `, SpriteKind.Body)]
tiles.placeOnTile(Head, tiles.getTileLocation(2, 1))
tiles.placeOnTile(Body[0], tiles.getTileLocation(1, 1))
let Squarefood = sprites.create(img`
    4 4 4 4 4 4 4 2 
    4 2 2 2 2 2 2 e 
    4 2 2 2 2 2 2 e 
    4 2 2 2 2 2 2 e 
    4 2 2 2 2 2 2 e 
    4 2 2 2 2 2 2 e 
    4 2 2 2 2 2 2 e 
    2 e e e e e e e 
    `, SpriteKind.Food)
tiles.placeOnRandomTile(Squarefood, assets.tile`myTile0`)
let By: number[] = []
let Bx: number[] = []
let Bdir: number[] = []
Hdir = 90
let Max_length = 6
Eated = false
Snakelenght = 1
music.setVolume(255)
Score_setup()
forever(function () {
    if (Snakelenght >= Max_length) {
        Eated = false
        Bonus = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........4444444444444444
            ........444444444444444e
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........44222222222222ee
            ........4eeeeeeeeeeeeeee
            ........eeeeeeeeeeeeeeee
            `, SpriteKind.BonusFood)
        tiles.placeOnTile(Bonus, tiles.getTileLocation(randint(1, 17), randint(1, 12)))
        Bonusnumscore = randint(40, 50)
        BonusBar = statusbars.create(160, 8, StatusBarKind.BonusBar)
        BonusBar.setPosition(80, scene.screenHeight() - 4)
        BonusBar.max = Bonusnumscore
        BonusBar.setColor(9, 1)
        BonusBar.setBarBorder(1, 1)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 3724, 3771, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        while (Bonusnumscore >= 0) {
            Bonusnumscore += -1
            if (!(Eated)) {
                BonusBar.value = Bonusnumscore
            }
            pause(100)
        }
        if (Snakelenght >= Max_length) {
            BonusBar.destroy()
            Bonus.destroy()
            Bonusnumscore = 0
            Max_length += 5
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 5000, 5000, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        }
    }
})
forever(function () {
    if (Hdir == 0) {
        Head.y += -8
    } else if (Hdir == 90) {
        Head.x += 8
    } else if (Hdir == 180) {
        Head.y += 8
    } else {
        Head.x += -8
    }
    Bx.unshift(Head.x)
    By.unshift(Head.y)
    Bdir.unshift(Hdir)
    pause(250)
})
forever(function () {
    if (Numscore > Numhiscore) {
        Numhiscore = Numscore
    }
    blockSettings.writeNumber("Hi", Numhiscore)
    Score.setText("score:" + Numscore)
    Hiscore.setText("Hiscore:" + Numhiscore)
})
forever(function () {
    for (let index = 0; index <= Snakelenght; index++) {
        if (index > 0) {
            Body[index - 1].setPosition(Bx[index], By[index])
        }
    }
})
