import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

const FraminghamRunnerGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameInstance, setGameInstance] = useState<Phaser.Game | null>(null);

  

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.tabIndex = 0; // Agar bisa menerima fokus
      gameRef.current.focus();      // Paksa fokus
    }
  }, []);  

  useEffect(() => {
    class LandingScene extends Phaser.Scene {
        constructor() {
          super('LandingScene');
        }
      
        preload() {
          // Memuat gambar background untuk tampilan profesional
          this.load.image('background', '/assets/img/bg-calculator.jpg');
        }
      
        create() {
            
          // Menambahkan background dengan gambar
          this.add.image(400, 300, 'background').setScale(1.5);
      
          // Menampilkan judul dan subtitle dengan lebih menarik
          this.createTitle();
      
          // Menambahkan deskripsi singkat tentang game ini
          this.createDescription();
      
          // Animasi untuk elemen-elemen agar lebih dinamis
          this.createAnimations();
      
          // Setelah 3 detik, pindah ke MainScene
          this.time.delayedCall(3000, () => {
            this.scene.start('MainScene');
          });
        }
      
        private createTitle() {
          const title = this.add.text(400, 180, '🫀 Cardium Runner', {
            fontSize: '36px',  // Ukuran font lebih kecil
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial, sans-serif',
          });
          title.setOrigin(0.5);
        }
      
        private createDescription() {
          const description = this.add.text(400, 250, '', {
            fontSize: '18px',  // Ukuran font lebih kecil
            color: '#ecf0f1',
            fontStyle: 'italic',
            fontFamily: 'Arial, sans-serif',
            align: 'center',
            wordWrap: { width: 600 }
          });
          description.setOrigin(0.5);
        }
      
        private createAnimations() {
          // Animasi untuk elemen title dan subtitle
          const title = this.add.text(400, 180, '🫀 Cardium Runner', {
            fontSize: '36px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial, sans-serif',
          });
          title.setOrigin(0.5);
          title.setAlpha(0); // Mulai dengan transparan
      
          this.tweens.add({
            targets: title,
            alpha: 1,  // Animasi menuju tampilan penuh
            duration: 1000,
            ease: 'Power2',
          });
      
          // Animasi subtitle untuk memperkenalkan deskripsi game
          const description = this.add.text(400, 250, 'Menjaga kesehatan jantung melalui petualangan yang menyenangkan.\nKumpulkan poin dan hindari rintangan!\nLoading...', {
            fontSize: '14px',
            color: '#ecf0f1',
            fontStyle: 'italic',
            fontFamily: 'Arial, sans-serif',
            align: 'center',
            wordWrap: { width: 600 }
          });
          description.setOrigin(0.5);
          description.setAlpha(0);
      
          this.tweens.add({
            targets: description,
            alpha: 1,  // Animasi menuju tampilan penuh
            duration: 1000,
            delay: 500,  // Delay untuk muncul setelah judul
            ease: 'Power2',
          });
        }
      }
        
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: gameRef.current || undefined,
        width: '100%',
        height: '100%',
      },      
      parent: gameRef.current || undefined,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 500 },
          debug: false,
        },
      },
      scene: [LandingScene, { key: 'MainScene', preload, create, update }],
    };

    let player: Phaser.Physics.Arcade.Sprite;
    let goodItems: Phaser.Physics.Arcade.Group;
    let badItems: Phaser.Physics.Arcade.Group;
    let scoreText: Phaser.GameObjects.Text;
    let highestScoreText: Phaser.GameObjects.Text;
    let gameOverText: Phaser.GameObjects.Text;
    let ground: Phaser.GameObjects.TileSprite;
    let background1: Phaser.GameObjects.TileSprite;
    let background2: Phaser.GameObjects.TileSprite;

    let health = 100;
    let score = 0;
    let isGameOver = false;
    let itemSpeed = -200;
    let highestScore = Number(localStorage.getItem("highestScore")) || 0;

    const goodItemList = [
      { key: 'vegetables', url: 'assets/img/game/apple.png' },
      { key: 'exercise', url: 'assets/img/game/dumbell.png' },
      { key: 'water', url: 'assets/img/game/water.png' }
    ];

    const badItemList = [
      { key: 'cigarette', url: '/assets/img/game/cigarette.png' },
      { key: 'fastfood', url: '/assets/img/game/fastfood.png' },
      { key: 'soda', url: '/assets/img/game/soda.png' }
    ];

    function preload(this: Phaser.Scene) {
      this.load.image('ground', '/assets/img/game/platform.png');
      this.load.image('background1', 'https://labs.phaser.io/assets/skies/clouds.png'); // ganti awan
      this.load.image('background2', 'https://labs.phaser.io/assets/skies/space3.png');  // ganti langit

      this.load.spritesheet('player', '/assets/img/game/spritesheet.png', {
        frameWidth: 35,
        frameHeight: 48,
      });

      goodItemList.forEach(item => this.load.image(item.key, item.url));
      badItemList.forEach(item => this.load.image(item.key, item.url));
    }

    function create(this: Phaser.Scene) {
        const width = this.scale.width;
        const height = this.scale.height;
      
        background2 = this.add.tileSprite(width / 2, height / 2, width, height, 'background2');
        background1 = this.add.tileSprite(width / 2, height / 2, width, height, 'background1');
      
        ground = this.add.tileSprite(width / 2, height - 32, width, 64, 'ground'); // Sesuaikan posisi Y ground
        this.physics.add.existing(ground, true);

      player = this.physics.add.sprite(100, height - 100, 'player'); // Jelas di atas ground
      player.setBounce(0.1);
      player.setCollideWorldBounds(true);

      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
      player.play('run');

      this.input.keyboard?.createCursorKeys(); // Tidak perlu disimpan ke variabel luar
(this as any).cursors = this.input.keyboard?.createCursorKeys(); // Simpan ke scene


      goodItems = this.physics.add.group();
      badItems = this.physics.add.group();

      this.time.addEvent({ delay: 1200, callback: spawnItems, callbackScope: this, loop: true });
      this.time.addEvent({ delay: 8000, callback: increaseSpeed, callbackScope: this, loop: true });

      this.physics.add.collider(player, ground);
      this.physics.add.collider(goodItems, ground);
      this.physics.add.collider(badItems, ground);

      this.physics.add.overlap(player, goodItems, collectGood as any, undefined, this);
      this.physics.add.overlap(player, badItems, collectBad as any, undefined, this);

      scoreText = this.add.text(16, 16, '', { fontSize: '16px', color: '#ffffff', lineSpacing: 2 });
      highestScoreText = this.add.text(this.scale.width * 0.7, 16, `🏆 Skor Tertinggi: ${highestScore}`, {
        fontSize: '16px',
        color: '#ffdd00',
    });
    highestScoreText.setOrigin(0, 0); // Pastikan origin di kiri atas jika menggunakan wordWrap
    gameOverText = this.add.text(this.scale.width / 2, this.scale.height / 2, '', { // Tengah layar
        fontSize: '32px',
        color: '#fff',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);

      updateText();
      
    }

    function update(this: Phaser.Scene) {
      if (isGameOver) return;
      const cursors = (this as any).cursors;
      if (!cursors || !player.body) return;
      background1.tilePositionX += 0.8;
      background2.tilePositionX += 0.3;
      ground.tilePositionX += 2;
console.log("Up:", cursors.up.isDown);
      player.setVelocityX(0);

      if (cursors.left?.isDown) {
        player.setVelocityX(-160);
        player.setFlipX(true);
      } else if (cursors.right?.isDown) {
        player.setVelocityX(160);
        player.setFlipX(false);
      }

      if (
        cursors.up?.isDown &&
        player.body &&
        (player.body as Phaser.Physics.Arcade.Body).touching.down
      ) {
        player.setVelocityY(-350);
      }
    }

    function spawnItems(this: Phaser.Scene) {
      if (isGameOver) return;

      const isGood = Phaser.Math.Between(0, 1) === 0;
      const itemList = isGood ? goodItemList : badItemList;
      const item = Phaser.Utils.Array.GetRandom(itemList);
      const x = 800;
      const y = Phaser.Math.Between(150, 300);

      const group = isGood ? goodItems : badItems;
      const sprite = group.create(x, y, item.key) as Phaser.Physics.Arcade.Image;
      sprite.setVelocityX(itemSpeed);
      sprite.setCollideWorldBounds(false);
      sprite.setBounce(0.3);
      sprite.setDisplaySize(42, 42); // Make all items have the same size
    }

    function increaseSpeed() {
      itemSpeed -= 20;
    }

    function collectGood(_player: Phaser.GameObjects.GameObject, item: Phaser.GameObjects.GameObject) {
      (item as Phaser.Physics.Arcade.Image).disableBody(true, true);
      health = Math.min(health + 5, 100);
      score += 10;
      updateText();
    }

    function collectBad(_player: Phaser.GameObjects.GameObject, item: Phaser.GameObjects.GameObject) {
      (item as Phaser.Physics.Arcade.Image).disableBody(true, true);
      health = Math.max(health - 20, 0);
      updateText();
      if (health <= 0) endGame();
    }

    function updateText() {
      scoreText.setText(`❤️ Kesehatan: ${health}\n⭐ Skor: ${score}`);
      if (score > highestScore) {
        highestScore = score;
        localStorage.setItem("highestScore", String(highestScore));
        highestScoreText.setText(`🏆 Skor Tertinggi: ${highestScore}`);
      }
    }

    function endGame() {
      isGameOver = true;
      gameOverText.setText(`Game Over\nSkor Anda: ${score}`);
      goodItems.clear(true, true);
      badItems.clear(true, true);
      player.setTint(0xff0000);
      player.anims.stop();
    }

    if (!gameInstance) {
      const newGame = new Phaser.Game(config);
      setGameInstance(newGame); // Set game instance untuk memicu render ulang
    }

    return () => {
      gameInstance?.destroy(true); // Hapus game instance saat komponen unmount
    };
  }, [gameInstance]);

  const handleRestart = () => {
    gameInstance?.destroy(true); // Destroy the current game
    setGameInstance(null); // Reset the game instance
    useEffect(() => {
        setTimeout(() => {
          if (gameRef.current) {
            gameRef.current.tabIndex = 0;
            gameRef.current.focus();
          }
        }, 100); // 100ms cukup untuk memberikan waktu mount
      }, []); // Ensure game container gets focus again
};

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 className="text-lg font-semibold mb-2">Panduan Cardium Runner</h2>
      <p className="text-sm">
          Gunakan tombol ⬅️ ➡️ untuk bergerak dan ⬆️ untuk melompat.
      </p>
      <p className="text-sm mb-4">
        Ambil makanan sehat untuk meningkatkan skor dan hindari yang tidak sehat!
      </p>

    <div className="flex justify-between items-center mb-2 mx-1">
    <div className="flex space-x-4">
        <div className="text-center">
        <img src="/assets/img/game/cigarette.png" alt="Rokok" className="w-6 h-6" />
        <p className="text-xs text-red-500">Hindari</p>
        </div>
        <div className="text-center">
        <img src="/assets/img/game/fastfood.png" alt="Fast Food" className="w-6 h-6" />
        <p className="text-xs text-red-500">Hindari</p>
        </div>
        <div className="text-center">
        <img src="/assets/img/game/soda.png" alt="Soda" className="w-6 h-6" />
        <p className="text-xs text-red-500">Hindari</p>
        </div>
    </div>

    <div className="flex space-x-4">
        <div className="text-center">
        <img src="/assets/img/game/apple.png" alt="Apel" className="w-6 h-6" />
        <p className="text-xs text-green-500">Ambil</p>
        </div>
        <div className="text-center">
        <img src="/assets/img/game/dumbell.png" alt="Brokoli" className="w-6 h-6" />
        <p className="text-xs text-green-500">Ambil</p>
        </div>
        <div className="text-center">
        <img src="/assets/img/game/water.png" alt="Air Putih" className="w-6 h-6" />
        <p className="text-xs text-green-500">Ambil</p>
        </div>
    </div>
    </div>
      <div ref={gameRef} style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '400px', margin: '0 auto' }} />
      <button onClick={handleRestart} className="mt-4 p-2 bg-maintheme w-full text-white rounded">
        Restart Game
      </button>
    </div>
  );
};

export default FraminghamRunnerGame;
