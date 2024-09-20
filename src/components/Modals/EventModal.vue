<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal " @click.stop>
      <div class="flex justify-between modalHeader text-white text-2xl uppercase px-4 py-2">
        <h2>{{ eventTitle }}</h2>
        <span class="close cursor-pointer" @click="closeModal">&times;</span>
      </div>

      <div class="">
        <div class="border-2">
          <img style="width: 100%; height: 350px;" :src="eventImage" />
        </div>
        <div class="text-white flex flex-col justify-between  contentContainer">
          <h2 style="color: #2A83FF;" class="text-2xl">{{ eventTitle }}</h2>
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

export default {
  components: {
    ButtonPress,
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

  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    joinEvent(){
      console.log("Joining Event..");
      return confirm("Join Events?")
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