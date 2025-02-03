export default {
    props: {
        currentMode: {
            type: String,
            required: true
        }
    },
    template: `
        <div class="fixed-header">
            <div class="container mx-auto px-4">
                <div class="flex flex-col">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-blue-600">Узбекский для базара 🇺🇿</h1>
                    </div>

                    <div class="desktop-nav flex gap-4 mt-4">
                        <button @click.stop="$emit('update:currentMode', 'theory')"
                            :class="{'bg-blue-500 text-white': currentMode === 'theory', 'bg-white': currentMode !== 'theory'}"
                            class="flex-1 px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all text-center">
                            Теория
                        </button>
                        <button @click.stop="$emit('update:currentMode', 'list')"
                            :class="{'bg-blue-500 text-white': currentMode === 'list', 'bg-white': currentMode !== 'list'}"
                            class="flex-1 px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all text-center">
                            Список слов
                        </button>
                        <button @click.stop="$emit('update:currentMode', 'learn')"
                            :class="{'bg-blue-500 text-white': currentMode === 'learn', 'bg-white': currentMode !== 'learn'}"
                            class="flex-1 px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all text-center">
                            Учить
                        </button>
                        <button @click.stop="startNewPractice"
                            :class="{'bg-blue-500 text-white': currentMode === 'practice', 'bg-white': currentMode !== 'practice'}"
                            class="flex-1 px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all text-center">
                            Тренировка
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        startNewPractice() {
            this.$emit('start-practice');
        }
    }
} 