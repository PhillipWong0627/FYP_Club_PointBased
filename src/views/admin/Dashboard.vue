<template>
  <div class="mt-32">
    <div class="container mx-auto">
      <h2 class="text-2xl font-semibold mb-6">Event Participation Metrics</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="px-4 py-2">Event ID</th>
              <th class="px-4 py-2">Event Title</th>
              <th class="px-4 py-2">Event Description</th>
              <th class="px-4 py-2">Event Date</th>
              <th class="px-4 py-2">Number of Participants</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td class="border px-4 py-2">{{ event.id }}</td>
              <td class="border px-4 py-2">{{ event.eventTitle }}</td>
              <td class="border px-4 py-2">{{ event.eventDescription }}</td>
              <td class="border px-4 py-2">{{ event.eventDateTime }}</td>
              <td class="border px-4 py-2">{{ event.members.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>
<script>

import axios from 'axios';
export default {
  mounted() {
    this.fetchEventParticipation();
  },
  data() {
    return {
      events: [],
    };
  },
  name: "dashboard-page",
  components: {
  },
  methods: {
    async fetchEventParticipation() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/admin/events/all');
        this.events = response.data.data;
      } catch (error) {
        console.error('Error fetching event participation:', error);
      }
    }
  },


}

</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>

