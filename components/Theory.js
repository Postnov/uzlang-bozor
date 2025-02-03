export default {
    name: 'TheoryMode',
    props: {
        theory: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="mx-auto space-y-4 flex-grow w-full">
            <div v-for="section in theory.numbers" :key="section.title" class="bg-white p-4 rounded-lg shadow-sm">
                <div class="flex flex-col mb-3">
                    <h3 class="text-lg font-semibold">{{ section.title }}</h3>
                    <div class="text-sm text-gray-500 mt-1">{{ section.explanation }}</div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    <div v-for="example in section.examples" :key="example.number"
                        class="bg-blue-50 p-2 rounded-lg flex flex-col">
                        <div class="text-lg font-medium">{{ example.number }}</div>
                        <div class="flex items-center flex-wrap gap-1">
                            <div class="text-blue-600">{{ example.translation }}</div>
                            <div class="text-sm text-gray-500">({{ example.transcription }})</div>
                        </div>
                        <div v-if="example.formula" class="text-xs text-gray-600 mt-1 border-t border-gray-200 pt-1">
                            {{ example.formula }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
} 