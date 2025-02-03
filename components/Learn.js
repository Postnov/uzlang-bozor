export default {
    name: 'LearnMode',
    props: {
        words: {
            type: Array,
            required: true
        },
        numbers: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            learningItems: [],
            currentLearningIndex: 0,
            learningComplete: false
        }
    },
    computed: {
        currentLearningItem() {
            return this.learningItems[this.currentLearningIndex] || {};
        }
    },
    methods: {
        startLearning() {
            const allItems = [...this.words, ...this.numbers];
            this.learningItems = this.shuffleArray(allItems).slice(0, 10);
            this.currentLearningIndex = 0;
            this.learningComplete = false;
        },
        nextLearningItem() {
            if (this.currentLearningIndex < this.learningItems.length - 1) {
                this.currentLearningIndex++;
            } else {
                this.learningComplete = true;
            }
        },
        shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }
    },
    mounted() {
        this.startLearning();
    },
    template: `
        <div class="w-full sm:max-w-4xl mx-auto flex-grow">
            <div v-if="!learningComplete" class="bg-white p-8 rounded-lg shadow-md">
                <div class="text-center">
                    <div class="mb-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:items-center md:mb-6">
                        <span class="text-base text-gray-500">Карточка {{ currentLearningIndex + 1 }} из {{ learningItems.length }}</span>
                        <div class="w-48 bg-gray-200 rounded-full h-2.5">
                            <div class="bg-blue-600 h-2.5 rounded-full transition-all"
                                :style="{ width: (currentLearningIndex + 1) / learningItems.length * 100 + '%' }">
                            </div>
                        </div>
                    </div>
                    <div class="py-10 px-5 mx-auto border-2 border-blue-100 rounded-lg mb-10 flex flex-col items-center">
                        <h3 class="text-4xl mb-4">{{ currentLearningItem.original || currentLearningItem.number }}</h3>
                        <p class="text-xl text-gray-500 mb-2">({{ currentLearningItem.transcription }})</p>
                        <p class="text-2xl text-gray-600">{{ currentLearningItem.translation }}</p>
                    </div>
                    <button @click="nextLearningItem"
                        class="px-12 py-4 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-all">
                        {{ currentLearningIndex === learningItems.length - 1 ? 'Завершить' : 'Следующее слово' }}
                    </button>
                </div>
            </div>
            <div v-else class="bg-white p-8 rounded-lg shadow-md text-center">
                <h2 class="text-3xl font-bold mb-6">Отлично! 🎉</h2>
                <p class="text-xl mb-8">Вы просмотрели 10 случайных слов и чисел. Хотите продолжить изучение или перейти к тренировке?</p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <button @click="startLearning"
                        class="px-12 py-4 bg-white border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-50 transition-all w-full">
                        Изучить ещё
                    </button>
                    <button @click="$emit('start-practice')"
                        class="px-12 py-4 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-all w-full">
                        Перейти к тренировке
                    </button>
                </div>
            </div>
        </div>
    `
} 