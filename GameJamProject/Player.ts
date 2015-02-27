﻿module GameJam {

    export class Player extends Phaser.Sprite {
        bullets: Phaser.Group;
        fireRate: number;
        nextFire: number;
        facingRight: boolean;
        invincible: boolean;
        health: number;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.fireRate = 100;
            this.nextFire = 0;
            super(game, x, y, 'rockman');
            this.duration = game.time.now;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.checkWorldBounds = true;
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
                'rockman/player/idle/0001.png',
                'rockman/player/idle/0002.png',
                'rockman/player/idle/0003.png'
            ], 10, true);

            this.animations.add('dash', [
                'rockman/player/dash/0001.png',
                'rockman/player/dash/0002.png',
                'rockman/player/dash/0003.png'
            ], 10, true, false);

            this.animations.add('jump', [
                'rockman/player/jump/0001.png',
                'rockman/player/jump/0002.png',
                'rockman/player/jump/0003.png',
                'rockman/player/jump/0004.png',
                'rockman/player/jump/0005.png',
                'rockman/player/jump/0006.png',
                'rockman/player/jump/0007.png'
            ], 10, false, false);

            this.animations.add('walk', [
                'rockman/player/walk/0003.png',
                'rockman/player/walk/0004.png',
                'rockman/player/walk/0005.png',
                'rockman/player/walk/0006.png',
                'rockman/player/walk/0007.png',
                'rockman/player/walk/0008.png',
                'rockman/player/walk/0009.png',
                'rockman/player/walk/0010.png',
                'rockman/player/walk/0011.png',
                'rockman/player/walk/0012.png'
            ], 10, true, false);

            this.animations.add('shoot', [
                'rockman/player/shoot/0001.png',
                'rockman/player/shoot/0002.png'
            ], 10, true, false);

            this.animations.add('shootjump', [
                'rockman/player/shootjump/0001.png',
                'rockman/player/shootjump/0002.png',
                'rockman/player/shootjump/0003.png',
                'rockman/player/shootjump/0004.png',
                'rockman/player/shootjump/0005.png',
                'rockman/player/shootjump/0006.png',
                'rockman/player/shootjump/0007.png'
            ], 10, false, false);

            this.animations.add('shootrun', [
                'rockman/player/shootrun/0001.png',
                'rockman/player/shootrun/0002.png',
                'rockman/player/shootrun/0003.png',
                'rockman/player/shootrun/0004.png',
                'rockman/player/shootrun/0005.png',
                'rockman/player/shootrun/0006.png',
                'rockman/player/shootrun/0007.png',
                'rockman/player/shootrun/0008.png',
                'rockman/player/shootrun/0009.png',
                'rockman/player/shootrun/0010.png'
            ], 10, true, false);

            this.animations.play('idle');

            game.add.existing(this);

        }

        fire() {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();

                if (bullet === null || bullet === undefined) return;

                bullet.revive();
                bullet.checkWorldBounds = true;
                bullet.outOfBoundsKill = true;

                bullet.reset(this.x, this.y);
                bullet.rotation = this.rotation;
                var bulletSpeed = this.facingRight ? 700 : -700;
                bullet.body.velocity.x = Math.cos(bullet.rotation) * bulletSpeed;
                bullet.body.velocity.y = Math.sin(bullet.rotation) * bulletSpeed;
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
                this.facingRight = false;
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
                this.facingRight = false;
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
                this.facingRight = true;
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
                this.facingRight = true;
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