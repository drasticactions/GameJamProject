﻿module GameJam {

    export class Player extends Phaser.Sprite {
        bullets: Phaser.Group;
        fireRate: number;
        nextFire: number;
        constructor(game: Phaser.Game, x: number, y: number) {
            this.fireRate = 100;
            this.nextFire = 0;
            super(game, x, y, 'rockman');
            this.duration = game.time.now;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.anchor.setTo(0.5, 0);
            this.isJumping = false;

            this.bullets = game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(50, 'bullet');
            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);

            this.animations.add('idle',[
                'player/idle/0001.png',
                'player/idle/0002.png',
                'player/idle/0003.png'
            ], 10, true);

            this.animations.add('dash', [
                'player/dash/0001.png',
                'player/dash/0002.png',
                'player/dash/0003.png'
            ], 10, true, false);

            this.animations.add('jump', [
                'player/jump/0001.png',
                'player/jump/0002.png',
                'player/jump/0003.png',
                'player/jump/0004.png',
                'player/jump/0005.png',
                'player/jump/0006.png',
                'player/jump/0007.png'
            ], 10, false, false);

            this.animations.add('walk', [
                'player/walk/0003.png',
                'player/walk/0004.png',
                'player/walk/0005.png',
                'player/walk/0006.png',
                'player/walk/0007.png',
                'player/walk/0008.png',
                'player/walk/0009.png',
                'player/walk/0010.png',
                'player/walk/0011.png',
                'player/walk/0012.png'
            ], 10, true, false);

            this.animations.add('shoot', [
                'player/shoot/0001.png',
                'player/shoot/0002.png'
            ], 10, true, false);

            this.animations.add('shootjump', [
                'player/shootjump/0001.png',
                'player/shootjump/0002.png',
                'player/shootjump/0003.png',
                'player/shootjump/0004.png',
                'player/shootjump/0005.png',
                'player/shootjump/0006.png',
                'player/shootjump/0007.png'
            ], 10, false, false);

            this.animations.add('shootrun', [
                'player/shootrun/0001.png',
                'player/shootrun/0002.png',
                'player/shootrun/0003.png',
                'player/shootrun/0004.png',
                'player/shootrun/0005.png',
                'player/shootrun/0006.png',
                'player/shootrun/0007.png',
                'player/shootrun/0008.png',
                'player/shootrun/0009.png',
                'player/shootrun/0010.png'
            ], 10, true, false);

            this.animations.play('idle');

            game.add.existing(this);

        }

        fire() {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();

                bullet.reset(this.x - 8, this.y - 8);

                this.game.physics.arcade.moveToPointer(bullet, 300);
            }
        }

        isDoubleTap() {

        }

        update() {
            this.body.velocity.x = 0;

            this.playerLeftRight();

            this.playerJump();

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.fire();
            }
        }

        playerLeftRight() {

            if (this.cursors.left.isDown && this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = -150;
                // If we're jumping, don't fire the shoot animation.
                if (!this.isJumping)
                    this.animations.play('shootrun');
                else 
                    this.animations.play('shootjump');

                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.cursors.left.isDown) {

                this.body.velocity.x = -150;
                // If we're jumping, don't fire the walk animation.
                if (!this.isJumping)
                    this.animations.play('walk');

                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.cursors.right.isDown && this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = 150;
                // If we're jumping, don't fire the shoot animation.
                if (!this.isJumping)
                    this.animations.play('shootrun');
                else
                    this.animations.play('shootjump');

                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            }
            else if (this.cursors.right.isDown) {

                this.body.velocity.x = 150;
                if (!this.isJumping)
                    this.animations.play('walk');

                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                if (!this.isJumping)
                    this.animations.play('shoot');
                else {
                    this.animations.play('shootjump');
                }
            }
            else {
                if (!this.isJumping)
                    this.animations.play('idle');
            }
        }

        playerJump() {

            if (this.cursors.up.isDown && this.body.blocked.down) {
                this.isJumping = true;
                this.body.velocity.y = -150;
                this.animations.play('jump');
                this.duration = this.game.time.now + 750;
            } else if (!this.body.blocked.down) {
                this.isJumping = true;
            } else {
                this.isJumping = false;
            }

        }
        currentY: number;
        duration: number;
        isDoubleTapping: boolean;
        isDashing: boolean;
        isJumping: boolean;
        cursors: Phaser.CursorKeys;
    }

}