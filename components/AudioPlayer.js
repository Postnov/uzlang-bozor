export default {
    props: ['src'],
    template: `
        <button @click="playAudio" class="p-2 rounded-full hover:bg-gray-100">
            🔊
        </button>
    `,
    methods: {
        playAudio() {
            const audio = new Audio(this.src);
            audio.play();
        }
    }
} 