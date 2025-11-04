<script setup>
const props = defineProps({
    queryParameters: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

const emit = defineEmits(['update:queryParameters'])
// function to update URL
const updateUrl = (key,event) => {
  const updates = {
    ...props.queryParameters,
    [key]: event.target.value
  }
  
  // clear priceFilter, if filterType is changed to dateFormat
  if (event.target.name === 'filterType' && event.target.value === 'dateFormat') {
    updates.priceFilter = ''
  }
  
  emit('update:queryParameters', updates)
}
</script>

<template>
    <div class="controls">
      <div class="control-group">
        <label>Сортування:</label>
        <select :value="queryParameters.sortBy" @change="updateUrl('sortBy',$event)">
          <option value="price">За ціною (зростання)</option>
          <option value="date">За датою (зменшення)</option>
        </select>
      </div>

      <div class="control-group">
        <label>Тип фільтра:</label>
        <select  :value="queryParameters.filterType" @change="updateUrl('filterType',$event)">
          <option value="price">Фільтр по ціні</option>
          <option value="dateFormat">Формат дат</option>
        </select>
      </div>

      <div v-if="queryParameters.filterType === 'price'" class="control-group">
        <label>Фільтр по ціні:</label>
        <select :value="queryParameters.priceFilter" @change="updateUrl('priceFilter',$event)">
          <option value="">Всі</option>
          <option value="0-1000">До 1000</option>
          <option value="1000-1500">Від 1000 до 1500</option>
          <option value="2000+">2000 і більше</option>
        </select>
      </div>

      <div v-if="queryParameters.filterType === 'dateFormat'" class="control-group">
        <label>Формат дати:</label>
        <select  :value="queryParameters.dateFormat" @change="updateUrl('dateFormat',$event)">
          <option value="short">12/31/2025</option>
          <option value="long">Dec 31, 2025</option>
        </select>
      </div>
    </div>

</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.control-group select {
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  background: #696868;
}


</style>
