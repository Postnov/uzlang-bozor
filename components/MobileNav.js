export default {
    props: {
        currentMode: {
            type: String,
            required: true
        }
    },
    template: `
        <div class="mobile-nav">
            <div class="grid grid-cols-4 gap-2">
                <button @click.stop="$emit('update:currentMode', 'theory')" :class="{
                    'flex flex-col items-center p-2 text-center transition-colors': true,
                    'text-blue-500 bg-blue-50': currentMode === 'theory',
                    'text-gray-600': currentMode !== 'theory'
                }">
                    <span class="text-xl">📚</span>
                    <span class="text-xs">Теория</span>
                </button>
                <button @click.stop="$emit('update:currentMode', 'list')" :class="{
                    'flex flex-col items-center p-2 text-center transition-colors': true,
                    'text-blue-500 bg-blue-50': currentMode === 'list',
                    'text-gray-600': currentMode !== 'list'
                }">
                    <span class="text-xl">📝</span>
                    <span class="text-xs">Список</span>
                </button>
                <button @click.stop="$emit('update:currentMode', 'learn')" :class="{
                    'flex flex-col items-center p-2 text-center transition-colors': true,
                    'text-blue-500 bg-blue-50': currentMode === 'learn',
                    'text-gray-600': currentMode !== 'learn'
                }">
                    <span class="text-xl">📖</span>
                    <span class="text-xs">Учить</span>
                </button>
                <button @click.stop="startNewPractice" :class="{
                    'flex flex-col items-center p-2 text-center transition-colors': true,
                    'text-blue-500 bg-blue-50': currentMode === 'practice',
                    'text-gray-600': currentMode !== 'practice'
                }">
                    <span class="text-xl">✏️</span>
                    <span class="text-xs">Тренировка</span>
                </button>
            </div>
        </div>
    `,
    methods: {
        startNewPractice() {
            this.$emit('start-practice');
        }
    }
} 