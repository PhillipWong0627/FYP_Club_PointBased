<!-- Toast.vue -->
<template>
    <transition name="fade">
        <div v-if="visible" class="relative bottom-4 right-0 left-0 bg-green-500 text-white p-4 uppercase font-bold text-lg rounded shadow-lg">
            {{ message }}
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            message: ''
        };
    },
    methods: {
        showToast(message) {
            this.message = message;
            this.visible = true;

            // Hide the toast after 3 seconds
            setTimeout(() => {
                this.visible = false;
            }, 3000);
        }
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>