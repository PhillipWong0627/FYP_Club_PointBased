<template>
    <button :type="type" class="bg-green-500 hover:bg-green-400 duration-300 font-lg text-white rounded-full py-1.5 px-3 pr-3.5 text-sm">
        <slot></slot>
    </button>

</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button'
        }
    }
};
</script>
