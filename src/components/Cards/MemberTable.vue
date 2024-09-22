<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <Toast ref="toast" />
    <div class="h-[450px] flex items-center justify-center" v-if="loading">
      <span class="font-bold text-2xl text-black"> Loading...</span>
      <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
    </div>

    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            Member Tables
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Member ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Member Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Email
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Address
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Contact
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Description
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              isDeleted
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Points
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Actions
            </th>


            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in memberData" :key="i.memberData">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {{ i.id }}
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.memberName }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ i.email }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <span> {{ i.address }}
              </span>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.contact }}
                </span>

              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.description }}
                </span>

              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.deleted }}
                </span>

              </div>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2"> {{ i.points }}
                </span>

              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <ButtonPress @click="EditUser(i.id)">Edit</ButtonPress>
              <ButtonPress type="submit" @click="DeleteUser(i.id)">
                Delete</ButtonPress>

            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              <table-dropdown />
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";
import Toast from '@/components/Toast.vue'; // Make sure the path is correct



import ButtonPress from "@/components/ButtonPress.vue";
//API
import { getMemberInfo, deleteMember } from '@/service/apiProvider.js';

export default {
  mounted() {
    this.getMemberList();
  },
  data() {
    return {
      memberData: [

      ],
      loading: false,
    };
  },
  components: {
    TableDropdown,
    ButtonPress,
    Toast,

  },
  props: {
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  methods: {

    async getMemberList() {
      try {
        const result = await getMemberInfo();
        console.log("CALLING RESULT API");
        console.log(result);

        this.memberData = result;
      } catch (error) {
        console.error(error);
      }
    },
    EditUser(id) {
      console.log("Editing " + id)
      const routeData = this.$router.resolve({
        name: "EditUser",
        query: {
          MemberID: id,
        },
      });

      window.location.href = routeData.href;
    },
    async DeleteUser(id) {
      console.log("Deleting " + id)

      try {
        this.loading = true;

        const result = await deleteMember(id);
        console.log(result);
        this.$refs.toast.showToast("User Have Been Deleted successfully!");

      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }



};
</script>
