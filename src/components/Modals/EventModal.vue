<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <Toast ref="toast" />

    <div class="modal " @click.stop>
      <div class="h-[450px] flex items-center justify-center" v-if="loading">
        <span class="font-bold text-2xl text-white"> Loading...</span>
        <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
      </div>

      <span class="text-white"> EventID: {{ eventId }}</span>
      <div class="flex justify-between modalHeader text-white text-2xl uppercase px-4 py-2">
        <h2> {{ eventTitle }} </h2>
        <span class="close cursor-pointer" @click="closeModal">&times;</span>
      </div>
      <div class="">
        <div class="border-2">
          <img style="width: 100%; height: 250px;" :src="eventImage" />
        </div>
        <div class="text-white flex flex-col justify-betwen ">
          <h2 style="color: #2A83FF;" class="text-2xl">{{ eventTitle }}</h2>
          <h2 style="color: #2A83FF;" class="text-2xl">RM {{ eventFee }}</h2>
          <p>{{ eventDescription }}</p>
          <span>
            ✅ To register, scan the QR code or click on the link below: https://t.ly/1nneT

            Don’t miss your chance to shape the future of FinTech and drive innovation forward! 💡

          </span>
          <ButtonPress class="w-full uppercase text-base font-bold" @click="joinEvent()">Join Event</ButtonPress>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ButtonPress from "@/components/ButtonPress.vue";
import axios from 'axios';
import { ref } from 'vue';

export default {
  components: {
    ButtonPress,
  },
  data() {
    return {
      memberId: localStorage.getItem('memberID'),
      loading: false,
      loggedIn: ref(false),


    }
  },
  created() {
    // Check if the user is logged in based on localStorage data
    const memberID = localStorage.getItem('memberID');
    const memberName = localStorage.getItem('memberName');
    const email = localStorage.getItem('email');

    // Set loggedIn to true if any of the items exist in localStorage
    if (memberID && memberName && email) {
      this.loggedIn = true;
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    eventTitle: {
      type: String,
      default: "",
    },
    eventDescription: {
      type: String,
      default: "",
    },
    eventImage: {
      type: String,
      default: "",
      required: true,
    },
    eventId: {
      type: Number,
      required: true,
    },
    eventFee: {
      type: Number,
      required: true,
    }


  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async joinEvent() {
      if (this.loggedIn) {
        this.loading = true;

        // console.log("Joining Event..");
        console.log(this.eventId + "&" + this.memberId)
        try {
          const response = await axios.post(`/api/v1/admin/events/${this.eventId}/join/${this.memberId}`);
          // console.log("THIS IS RESPONSE");
          // console.log(response);
          // console.log("THIS IS DATA");
          // console.log(response.data);
          if (response.data['code'] === 0) {
            alert("Successfully joined the event!");
            this.closeModal();
          } else {
            alert("Error joining the event: " + response.data['msg']);
            this.closeModal();

          }
        } catch (error) {
          console.error("Error joining the event", error);
          alert("Failed to join the event.");
          this.closeModal();

        } finally {
          this.loading = false;
          this.closeModal();


        }
      } else {
        alert("Please Log in to Join the event!!")
        this.closeModal();

      }



    },
  },
};
</script>

<style scoped>
.modalHeader {
  background-color: #191919;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  /* background: white; */
  background-color: #191919;
  height: 100vh;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-width: 100%;
}


@media (min-width:640px) {
  .contentContainer {
    height: 400px;
  }
}
</style>