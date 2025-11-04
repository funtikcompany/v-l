<template>
  <div class="listings-container">
    <h1>Лістинги</h1>
    <ControlPanel :queryParameters="queryParameters" @update:queryParameters="updateUrl" />
    <div class="listings">
      <ListingItem v-for="listing in sortedAndFilteredListings" :key="listing.id" :listing="listing" :dateFormat="dateFormat" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ListingItem from '../components/ListingItem.vue'
import ControlPanel from '../components/ControlPanel.vue'

const route = useRoute()
const router = useRouter()

const listings = ref([
  { id: 1, name: 'Лістинг 1', tags: ['Хіт', 'Популярний'], date: '2025-12-15', price: 1200 },
  { id: 2, name: 'Лістинг 2', tags: [], date: '2025-12-20', price: 800 },
  { id: 3, name: 'Лістинг 3', tags: ['Новий'], date: '2025-12-10', price: 2500 },
  { id: 4, name: 'Лістинг 4', tags: ['Хіт'], date: '2025-12-25', price: 1500 },
  { id: 5, name: 'Лістинг 5', tags: ['Популярний'], date: '2025-12-05', price: 950 },
  { id: 6, name: 'Лістинг 6', tags: ['Хіт', 'Новий'], date: '2025-12-18', price: 2200 },
  { id: 7, name: 'Лістинг 7', tags: [], date: '2025-12-12', price: 1100 },
  { id: 8, name: 'Лістинг 8', tags: ['Популярний'], date: '2025-12-30', price: 1800 },
])
const queryParameters = ref({
  sortBy: 'price',
  filterType: 'price',
  priceFilter: '',
  dateFormat: 'short'
})
const priorityTag = 'Хіт'

// Read URL parameters on mount and watch for changes
const updateFromUrl = () => {
  Object.assign(queryParameters.value, {
    sortBy: route.query.sortBy || queryParameters.value.sortBy,
    filterType: route.query.filterType || queryParameters.value.filterType,
    priceFilter: route.query.priceFilter || queryParameters.value.priceFilter,
    dateFormat: route.query.dateFormat || queryParameters.value.dateFormat
  })
}


// Update URL when component mounts
onMounted(() => {
  updateFromUrl()
})

// Watch for route changes
watch(() => route.query, () => {
  updateFromUrl()
}, { deep: true })

// Update URL when filters change
const updateUrl = (updatedParams) => {
  // Оновлюємо queryParameters з отриманих даних
  if (updatedParams) {
    queryParameters.value = { ...queryParameters.value, ...updatedParams }
  }
  
  const query = {
    sortBy: queryParameters.value.sortBy,
    filterType: queryParameters.value.filterType,
    dateFormat: queryParameters.value.dateFormat
  }
  
  if (queryParameters.value.filterType === 'price' && queryParameters.value.priceFilter) {
    query.priceFilter = queryParameters.value.priceFilter
  }
  
  router.push({ query })
}

const dateFormat = computed(() => queryParameters.value.dateFormat)

// Filter listings by price
const filteredBySomeKey = computed(() => {
  if (queryParameters.value.filterType !== 'price' || !queryParameters.value.priceFilter) {
    return listings.value
  }
  
  return listings.value.filter(listing => {
    const price = listing.price 
    switch (queryParameters.value.priceFilter) {
      case '0-1000':
        return price < 1000
      case '1000-1500':
        return price >= 1000 && price <= 1500
      case '2000+':
        return price >= 2000
      default:
        return true
    }
  })
})

// function to sort listings
const sortListings = (list) => {
  return [...list].sort((a, b) => {
    if (queryParameters.value.sortBy === 'price') return a.price - b.price
    return new Date(b.date) - new Date(a.date)
  })
}

// Sort and prioritize listings
const sortedAndFilteredListings = computed(() => {
  let result = [...filteredBySomeKey.value]
  
  const priorityListings = result.filter(listing => 
    listing.tags.includes(priorityTag)
  )
  
  const otherListings = result.filter(listing => 
    !listing.tags.includes(priorityTag)
  )
  
  return [...sortListings(priorityListings), ...sortListings(otherListings)]

})


</script>

<style scoped>
.listings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}


.listings {
  display: grid;
  gap: 20px;
}
</style>

