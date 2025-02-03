import AudioPlayer from './AudioPlayer.js'

export default {
    name: 'ListMode',
    components: { AudioPlayer },
    props: {
        words: {
            type: Array,
            required: true
        },
        numbers: {
            type: Array,
            required: true
        },
        wordProgress: {
            type: Object,
            required: true
        },
        numberProgress: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            currentTab: 'words'
        }
    },
    computed: {
        groupedNumbers() {
            const groups = [
                {
                    title: "Базовые числа (1-10)",
                    explanation: "Это базовые числа, которые нужно выучить. Они используются для построения всех остальных чисел.",
                    numbers: this.numbers.filter(n => n.number <= 10)
                },
                {
                    title: "Числа 11-19",
                    explanation: "Числа от 11 до 19 образуются добавлением базового числа к слову O'n (десять)",
                    numbers: this.numbers.filter(n => n.number >= 11 && n.number <= 19).map(n => ({
                        ...n,
                        formula: `10 (O'n) + ${n.number - 10} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Двадцать (20-29)",
                    explanation: "Числа от 21 до 29 образуются добавлением базового числа к слову Yigirma (двадцать)",
                    numbers: this.numbers.filter(n => n.number >= 20 && n.number <= 29).map(n => ({
                        ...n,
                        formula: n.number === 20 ? undefined : `20 (Yigirma) + ${n.number - 20} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Тридцать (30-39)",
                    explanation: "Числа от 31 до 39 образуются добавлением базового числа к слову O'ttiz (тридцать)",
                    numbers: this.numbers.filter(n => n.number >= 30 && n.number <= 39).map(n => ({
                        ...n,
                        formula: n.number === 30 ? undefined : `30 (O'ttiz) + ${n.number - 30} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Сорок (40-49)",
                    explanation: "Числа от 41 до 49 образуются добавлением базового числа к слову Qirq (сорок)",
                    numbers: this.numbers.filter(n => n.number >= 40 && n.number <= 49).map(n => ({
                        ...n,
                        formula: n.number === 40 ? undefined : `40 (Qirq) + ${n.number - 40} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Пятьдесят (50-59)",
                    explanation: "Числа от 51 до 59 образуются добавлением базового числа к слову Ellik (пятьдесят)",
                    numbers: this.numbers.filter(n => n.number >= 50 && n.number <= 59).map(n => ({
                        ...n,
                        formula: n.number === 50 ? undefined : `50 (Ellik) + ${n.number - 50} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Шестьдесят (60-69)",
                    explanation: "Числа от 61 до 69 образуются добавлением базового числа к слову Oltmish (шестьдесят)",
                    numbers: this.numbers.filter(n => n.number >= 60 && n.number <= 69).map(n => ({
                        ...n,
                        formula: n.number === 60 ? undefined : `60 (Oltmish) + ${n.number - 60} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Семьдесят (70-79)",
                    explanation: "Числа от 71 до 79 образуются добавлением базового числа к слову Yetmish (семьдесят)",
                    numbers: this.numbers.filter(n => n.number >= 70 && n.number <= 79).map(n => ({
                        ...n,
                        formula: n.number === 70 ? undefined : `70 (Yetmish) + ${n.number - 70} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Восемьдесят (80-89)",
                    explanation: "Числа от 81 до 89 образуются добавлением базового числа к слову Sakson (восемьдесят)",
                    numbers: this.numbers.filter(n => n.number >= 80 && n.number <= 89).map(n => ({
                        ...n,
                        formula: n.number === 80 ? undefined : `80 (Sakson) + ${n.number - 80} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Девяносто (90-99)",
                    explanation: "Числа от 91 до 99 образуются добавлением базового числа к слову To'qson (девяносто)",
                    numbers: this.numbers.filter(n => n.number >= 90 && n.number <= 99).map(n => ({
                        ...n,
                        formula: n.number === 90 ? undefined : `90 (To'qson) + ${n.number - 90} (${n.translation.split(' ')[1]})`
                    }))
                },
                {
                    title: "Сотня",
                    explanation: "Сто на узбекском языке",
                    numbers: this.numbers.filter(n => n.number === 100)
                }
            ];
            return groups.filter(group => group.numbers.length > 0);
        }
    },
    methods: {
        getProgressPercent(item) {
            const progress = this.currentTab === 'words' ? this.wordProgress : this.numberProgress;
            const itemId = this.currentTab === 'words' ? item.id : item.number;
            
            if (!progress[itemId]) {
                return 0;
            }
            
            const itemProgress = progress[itemId];
            if (itemProgress.total === 0) {
                return 0;
            }
            
            return Math.round((itemProgress.correct / itemProgress.total) * 100);
        },
        getProgressColor(percent) {
            if (percent >= 80) return 'bg-green-500';
            if (percent >= 60) return 'bg-yellow-500';
            if (percent >= 40) return 'bg-orange-500';
            return 'bg-red-500';
        }
    },
    template: `
        <div class="w-full mx-auto flex-grow">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <div class="flex justify-start gap-4 mb-8">
                    <button @click="currentTab = 'words'"
                        :class="{
                            'px-6 py-2 rounded-lg font-medium transition-all': true,
                            'bg-blue-500 text-white': currentTab === 'words',
                            'bg-gray-100 text-gray-600 hover:bg-gray-200': currentTab !== 'words'
                        }">
                        Слова
                    </button>
                    <button @click="currentTab = 'numbers'"
                        :class="{
                            'px-6 py-2 rounded-lg font-medium transition-all': true,
                            'bg-blue-500 text-white': currentTab === 'numbers',
                            'bg-gray-100 text-gray-600 hover:bg-gray-200': currentTab !== 'numbers'
                        }">
                        Числа
                    </button>
                </div>

                <div v-if="currentTab === 'words'" class="grid gap-4 sm:grid-cols-2">
                    <div v-for="word in words" :key="word.id" class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex-grow">
                                <div class="text-lg font-medium mb-1">{{ word.original }}</div>
                                <div class="flex items-center flex-wrap gap-1">
                                    <div class="text-blue-600">{{ word.translation }}</div>
                                    <div class="text-gray-500">({{ word.transcription }})</div>
                                </div>
                                <div class="mt-3">
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Прогресс:</span>
                                        <span class="text-gray-600">{{ getProgressPercent(word) }}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="h-2 rounded-full transition-all"
                                            :class="getProgressColor(getProgressPercent(word))"
                                            :style="{ width: getProgressPercent(word) + '%' }">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AudioPlayer v-if="word.audio" :src="word.audio" />
                        </div>
                    </div>
                </div>

                <div v-else class="space-y-8">
                    <div v-for="group in groupedNumbers" :key="group.title" class="space-y-4">
                        <div class="mb-4">
                            <h3 class="text-lg font-semibold text-gray-700">{{ group.title }}</h3>
                            <p class="text-sm text-gray-500 mt-1">{{ group.explanation }}</p>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div v-for="number in group.numbers" :key="number.number" class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex items-start justify-between gap-4">
                                    <div class="flex-grow">
                                        <div class="text-lg font-medium mb-1">{{ number.number }}</div>
                                        <div class="flex items-center flex-wrap gap-1">
                                            <div class="text-blue-600">{{ number.translation }}</div>
                                            <div class="text-gray-500">({{ number.transcription }})</div>
                                        </div>
                                        <div v-if="number.formula" class="text-xs text-gray-600 mt-2 border-t border-gray-200 pt-2">
                                            {{ number.formula }}
                                        </div>
                                        <div class="mt-3">
                                            <div class="flex justify-between text-sm mb-1">
                                                <span class="text-gray-600">Прогресс:</span>
                                                <span class="text-gray-600">{{ getProgressPercent(number) }}%</span>
                                            </div>
                                            <div class="w-full bg-gray-200 rounded-full h-2">
                                                <div class="h-2 rounded-full transition-all"
                                                    :class="getProgressColor(getProgressPercent(number))"
                                                    :style="{ width: getProgressPercent(number) + '%' }">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <AudioPlayer v-if="number.audio" :src="number.audio" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
} 