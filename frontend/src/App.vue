<template>
  <div>
    Tolong

    <pre>
      {{ dataMessage.message }}
    </pre>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const dataMessage = ref(null);

onMounted(() => {
  getUser();
});

const getUser = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/");
    dataMessage.value = data;
  } catch (error) {
    console.error(error);
  }
};
</script>
