<template>
    <button :type="type" :disabled="disabled"
        class="bg-green-500 hover:bg-green-400 duration-300 font-lg text-white rounded-full py-1.5 px-3 pr-3.5 text-sm">
        <slot></slot>
    </button>

</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClick(event) {
            // Emit the click event if the button is not disabled or loading
            if (!this.disabled && !this.loading) {
                this.$emit('click', event);
            }
        }
    }

};
</script>

<style scoped>
.loader {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
    display: inline-block;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>