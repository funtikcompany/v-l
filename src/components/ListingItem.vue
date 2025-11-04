
<template>
    <div class="listing-card">
        <div class="listing-header">
            <h2>{{ listing.name }}</h2>
            <div class="tags">
                <Tag v-for="tag in listing.tags" :key="tag" :tag="tag" />
            </div>
        </div>
        <div class="listing-details">
            <div class="date">{{ formatDate(listing.date) }}</div>
            <div class="price">{{ formatPrice(listing.price) }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Tag from './Tag.vue'
const props = defineProps({
    listing: {
        type: Object,
        required: true,
        default: () => ({})
    },
    dateFormat: {
        type: String,
        required: true,
        default: 'short'
    }
})

// function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  
  if (props.dateFormat === 'short') {
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`
  } else {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }
}

// function to format price
const formatPrice = (price) => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

</script>

<style scoped>
    .listings {
        display: grid;
        gap: 20px;
    }

    .listing-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .listing-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .listing-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
        flex-wrap: wrap;
        gap: 10px;
    }

    .listing-header h2 {
        margin: 0;
        color: #333;
        font-size: 24px;
    }

    .tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }


    .listing-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;
        border-top: 1px solid #e0e0e0;
    }

    .date {
        color: #666;
        font-size: 14px;
    }

    .price {
        font-size: 20px;
        font-weight: 600;
        color: #646cff;
    }
</style>
