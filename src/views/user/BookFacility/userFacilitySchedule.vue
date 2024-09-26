<template>
  <div class="">
    <Navnavbars></Navnavbars>
    <UserNavbar></UserNavbar>
    <div class="container mx-auto px-4 py-8">
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr>
              <th class="border p-2">Court No.</th>
              <th v-for="i in courtByFacilityId" :key="i.id" class="border p-2">{{ i.courtNumber }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slot, index) in timeSlots" :key="index">
              <td class="borde-2  p-2">{{ slot }}</td>
              <td v-for="court in courtByFacilityId" :key="court.id" class="border p-2 text-center">
                <!-- {{ court.courtId }} -->
                <div :class="{
                  'bg-green-500': isSlotBooked(court.courtId, slot),
                  'bg-white': !isSlotBooked(court.courtId, slot),
                  'cursor-pointer': !isSlotBooked(court.courtId, slot),
                }" class="h-8 w-full S"
                  @click="!isSlotBooked(court.courtId, slot) && toPaymentModal(court.courtId, slot)">
                </div>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <FacilityList></FacilityList>

    <BookingModal :isVisible="isModalVisible" :time="time" :corutId="courtId" :facilityId="facilityId"
      @close="isModalVisible = false" />

    <FooterComp class="mt-12"></FooterComp>

  </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import FooterComp from "@/components/Footers/Footer.vue";

import BookingModal from "@/components/Modals/BookingModal.vue";
import FacilityList from "@/components/UserMainPage/FacilityList.vue";
import axios from "axios";

export default {
  mounted() {
    this.fetchCourtByFacilityId();
    this.fetchBookedSlots(); // Fetch booked slots when component mounts

  },

  data() {
    return {
      facilityId: this.$route.query.FacilityID,
      courtByFacilityId: [],
      bookedSlots: [], // Array to store booked slots for all courts

      courtId: null,
      time: '', // Bind to the name input
      isModalVisible: false, // Control modal visibility


      selectedSlots: [],
      selectedFacility: 1,
      selectedDate: new Date().toISOString().substr(0, 10),

      timeSlots: [
        '10:00-11:00',
        '11:00-12:00',
        '12:00-13:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        // Add more time slots here
      ],

    };
  },

  methods: {
    //Fetching 
    async fetchCourtByFacilityId() {
      const result = await axios.get(`/api/v1/admin/facilities/${this.facilityId}/courts`);
      // console.log(result);
      this.courtByFacilityId = result.data.data

      // console.log("DATA");
      // console.log(this.courtByFacilityId);

    },

    // Fetch booked slots
    async fetchBookedSlots() {
      console.log("FACILITTY ID");
      console.log(this.facilityId);
      console.log(this.selectedDate);
      const result = await axios.get(`/api/v1/member/bookings/getListByFacilityId_Date?facilityId=${this.facilityId}&date=${this.selectedDate}`);
      console.table(result.data.data);
      this.bookedSlots = result.data.data; // Assuming this returns a list of bookings with courtId and timeSlot

      console.log("HALO WORLD");
      console.log(this.bookedSlots);
    },

    isSlotBooked(courtId, slot) {
      console.log("DLLM");
      console.table(this.bookedSlots);
      return this.bookedSlots.some(
        (booking) => booking.court.courtId === courtId && booking.timeSlot === slot
      );
    },



    //HI
    onFacilityChange() {
      this.selectedSlots = []; // Reset selected slots when facility changes
    },

    toPaymentModal(courtId, slot) {

      console.log("Show Modal ");
      console.log(courtId);
      console.log(slot);

      this.courtId = courtId;
      this.time = slot; // Pass the time slot as a prop to the modal

      this.isModalVisible = true; // Show modal

    },

  },
  components: {
    Navnavbars,
    UserNavbar,
    FooterComp,
    BookingModal,
    FacilityList,
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