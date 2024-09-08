<template>
  <div class="border-2 border-red-500">
    <Navnavbars></Navnavbars>
    <UserNavbar></UserNavbar>
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <!-- Facility Selection -->
        <select v-model="facilities[0].id" class="px-3 py-2 border rounded-md ">
          <option v-for="facility in facilities" :key="facility.id" :value="facility.id">
            {{ facility.name }}
          </option>
        </select>

        <!-- Date Picker -->
        <input type="date" v-model="selectedDate" class="px-3 py-2 border rounded-md" />

        <!-- Make Booking Button -->
      <ButtonPress @click="toPaymentModal" class="uppercase font-semibold px-4 py-2">+ Make Booking</ButtonPress>
      </div>

      <!-- Court Booking Grid -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th class="border p-2">Court No.</th>
              <th v-for="court in courts" :key="court" class="border p-2">{{ court }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="time in timeSlots" :key="time">
              <td class="border p-2">{{ time }}</td>
              <td v-for="court in courts" :key="court" class="border p-2 text-center">
                <div :class="{
                  'bg-green-500': isBooked(time, court),
                  'bg-white': !isBooked(time, court),
                  'cursor-pointer': !isBooked(time, court),
                }" class="h-8  w-full" @click="bookSlot(time, court)"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <BookingModal :isVisible="isModalVisible" :name="name" :email="email" :password="password"
      @close="isModalVisible = false" />

    <FooterComp class="mt-12"></FooterComp>

  </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import FooterComp from "@/components/Footers/Footer.vue";
import ButtonPress from "@/components/ButtonPress.vue";

import BookingModal from "@/components/Modals/BookingModal.vue";

export default {

  data() {
    return {
      name: '', // Bind to the name input
      email: '', // Bind to the email input
      password: '', // Bind to the password input

      isModalVisible: false, // Control modal visibility

      selectedFacility: 'Badminton Rubber Flooring',
      selectedDate: new Date().toISOString().substr(0, 10),
      facilities: [
        { id: 'Badminton', name: 'Badminton Rubber Flooring' },
        { id: 'Swimming', name: 'Swimming Pool' },
        // Add more facilities here
      ],
      courts: [
        'Court 1',
        'Court 2',
        'Court 3',
        'Court 4',
        'Court 5',
        'Court 6'
      ],
      timeSlots: [
        '10:00-11:00',
        '11:00-12:00',
        '12:00-13:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        // Add more time slots here
      ],
      bookings: [
        {
          court: 'Court 1',
          timeSlot: '10:00-11:00',
          date: '2024-09-08'
        },
        {

          court: 'Court 2',
          timeSlot: '10:00-11:00',
          date: '2024-09-08'
        },
        {

          court: 'Court 3',
          timeSlot: '10:00-11:00',
          date: '2024-09-08'
        },
        // Add more existing bookings here
      ],
    };
  },

  methods: {
    toPaymentModal() {

        console.log("Show Modal ");

        this.isModalVisible = true; // Show modal

      


    },
    // Check if a specific time slot and court are booked
    isBooked(timeSlot, court) {
      return this.bookings.some(
        (booking) => booking.timeSlot === timeSlot && booking.court === court && booking.date === this.selectedDate
      );
    },
    // Book a time slot if available
    bookSlot(timeSlot, court) {
      if (!this.isBooked(timeSlot, court)) {
        this.bookings.push({
          court,
          timeSlot,
          date: this.selectedDate,
        });
        alert(`Booked ${court} at ${timeSlot} ${this.selectedDate}`);
      }
    },



  },
  components: {
    Navnavbars,
    UserNavbar,
    FooterComp,
    BookingModal,
    ButtonPress,
  }
};
</script>

<style scoped>
table {
  width: 100%;
}

th,
td {
  text-align: center;
}
</style>