new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack() {
            // human attack
            let maxDmg = 10;
            let minDmg = 3;
            let damage = Math.max(Math.floor(Math.random() * maxDmg) + 1, minDmg);
            this.monsterHealth -= damage;

            // monster attack
            maxDmg = 12;
            minDmg = 5;
            damage = Math.max(Math.floor(Math.random() * maxDmg) + 1, minDmg);
            this.playerHealth -= damage;

        },
        specialAttack() {

        },
        heal() {
this.playerHealth = 10000;
        },
        giveUp() {

        }
    }
})