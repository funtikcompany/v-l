
<template>
    <span 
        class="tag" :class="{ 'priority-tag': tag === 'Хіт' }"
    >
        {{ tag }}
    </span>

</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    tag: {
        type: String,
        required: true,
        default: ''
    }
})
</script>

<style scoped>
    .tag {
        padding: 4px 12px;
        background: #e0e0e0;
        border-radius: 12px;
        font-size: 12px;
        color: #666;
    }

    .tag.priority-tag {
        background: #ff6b6b;
        color: white;
        font-weight: 600;
    }
</style>
