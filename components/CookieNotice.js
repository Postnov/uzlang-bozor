export default {
    template: `
        <div v-if="showCookieNotice" class="cookie-notice">
            <div class="text-amber-500 text-xl">⚠️</div>
            <div class="flex-grow">
                <div class="text-gray-800 font-medium mb-1">Использование куки</div>
                <div class="text-gray-600 text-sm">
                    Мы используем куки для улучшения работы приложения.
                </div>
                <button @click="closeCookieNotice"
                    class="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all w-full">
                    Понятно
                </button>
            </div>
        </div>
    `,
    data() {
        return {
            showCookieNotice: true
        }
    },
    methods: {
        closeCookieNotice() {
            this.showCookieNotice = false;
            Cookies.set('cookieNoticeShown', 'true', { expires: 365 });
        }
    },
    mounted() {
        const cookieNoticeShown = Cookies.get('cookieNoticeShown');
        this.showCookieNotice = !cookieNoticeShown;
    }
} 