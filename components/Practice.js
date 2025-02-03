export default {
    name: 'PracticeMode',
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
            currentQuestion: null,
            showResult: false,
            isCorrect: false,
            correctAnswers: 0,
            wrongAnswers: 0,
            practiceComplete: false,
            practiceItems: [],
            questionsAnswered: 0,
            currentPracticeIndex: 0,
            selectedAnswer: null
        };
    },
    methods: {
        startNewPractice() {
            this.practiceComplete = false;
            this.correctAnswers = 0;
            this.wrongAnswers = 0;
            this.questionsAnswered = 0;

            const allItems = [...this.words, ...this.numbers];
            this.practiceItems = this.shuffleArray(allItems)
                .slice(0, 15)
                .map(item => ({
                    ...item,
                    isCorrect: null
                }));

            this.currentPracticeIndex = 0;
            this.generateQuestion();
        },
        generateQuestion() {
            if (this.questionsAnswered >= 15) {
                this.practiceComplete = true;
                return;
            }

            this.selectedAnswer = null;
            this.showResult = false;

            const item = this.practiceItems[this.currentPracticeIndex];
            const isNumber = 'number' in item;
            const options = [{
                translation: item.translation,
                transcription: item.transcription
            }];
            const pool = isNumber ? this.numbers : this.words;

            while (options.length < 4) {
                const randomItem = pool[Math.floor(Math.random() * pool.length)];
                const option = {
                    translation: randomItem.translation,
                    transcription: randomItem.transcription
                };
                if (!options.some(o => o.translation === option.translation)) {
                    options.push(option);
                }
            }

            this.currentQuestion = {
                type: isNumber ? 'number' : 'word',
                id: isNumber ? item.number : item.id,
                question: isNumber ?
                    `${item.number} на узбекском?` :
                    `Как переводится "${item.original}"?`,
                transcription: isNumber ? null : item.transcription,
                correct: item.translation,
                options: this.shuffleArray(options)
            };
        },
        checkAnswer(answer) {
            this.isCorrect = answer === this.currentQuestion.correct;
            this.selectedAnswer = answer;
            this.showResult = true;

            const currentItem = this.practiceItems[this.currentPracticeIndex];
            
            if (this.isCorrect) {
                this.correctAnswers++;
                currentItem.isCorrect = true;
                this.$emit('correct-answer', { ...this.currentQuestion, isCorrect: true });
            } else {
                this.wrongAnswers++;
                currentItem.isCorrect = false;
                this.$emit('wrong-answer', { ...this.currentQuestion, isCorrect: false });
            }

            this.questionsAnswered++;
            this.currentPracticeIndex++;

            setTimeout(() => {
                this.showResult = false;
                this.generateQuestion();
            }, 1000);
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
        this.startNewPractice();
    },
    template: `
        <div class="w-full sm:max-w-4xl mx-auto flex-grow">
            <div v-if="practiceComplete" class="bg-white p-8 rounded-lg shadow-md text-center">
                <h2 class="text-3xl font-bold mb-6">Тренировка завершена! 🎉</h2>
                <div class="text-xl mb-8">
                    <p>Правильных ответов: {{ correctAnswers }} из {{ questionsAnswered }}</p>
                    <p>Процент правильных ответов: {{ Math.round(correctAnswers / questionsAnswered * 100) }}%</p>
                </div>

                <div class="space-y-4">
                    <template v-for="item in practiceItems">
                        <div :key="item.id || item.number" class="flex flex-col p-4 bg-gray-50 rounded-lg">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-4 w-full">
                                    <span :class="item.isCorrect ? 'text-green-500' : 'text-red-500'" class="text-2xl">
                                        {{ item.isCorrect ? '✓' : '✗' }}
                                    </span>
                                    <div class="w-full">
                                        <div class="text-lg font-medium">
                                            {{ item.original || item.number }}
                                            <span class="text-base text-gray-500">({{ item.transcription }})</span>
                                        </div>
                                        <div class="text-base text-gray-600">{{ item.translation }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <button @click="startNewPractice"
                    class="px-12 py-4 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-all mt-8">
                    Ещё тренировку
                </button>
            </div>
            <div v-else class="text-center">
                <div class="mb-8">
                    <div class="flex justify-between text-base text-gray-500 mb-3">
                        <span>Прогресс тренировки</span>
                        <span>{{ questionsAnswered }} из 15</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-blue-600 h-3 rounded-full transition-all"
                            :style="{ width: (questionsAnswered / 15 * 100) + '%' }">
                        </div>
                    </div>
                </div>

                <div v-if="currentQuestion" class="bg-white p-8 rounded-lg shadow-md mb-8">
                    <h3 class="text-2xl mb-6">{{ currentQuestion.question }}</h3>
                    <div class="grid gap-4">
                        <button v-for="option in currentQuestion.options" :key="option.translation"
                            @click="checkAnswer(option.translation)"
                            :disabled="showResult"
                            :class="{
                                'p-4 rounded-lg text-left transition-all bg-gray-50': true,
                                'bg-gray-50 hover:bg-gray-200': !showResult && option.translation !== selectedAnswer,
                                'bg-green-100 text-green-700': showResult && option.translation === currentQuestion.correct,
                                'bg-red-100 text-red-700': showResult && option.translation === selectedAnswer && !isCorrect
                            }">
                            <div class="text-lg">{{ option.translation }}</div>
                            <div class="text-sm text-gray-500">{{ option.transcription }}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
};