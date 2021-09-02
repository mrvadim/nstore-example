<template>
  <div class="profile">
    <div class="mb-1">
      <h1 class="title">{{ $t("profile") }}</h1>
    </div>

    <div class="mb-1">
      <ul class="flex-row">
        <li class="mr-1">
          <nuxt-link to="/profile/orders">orders</nuxt-link>
        </li>
        <li class="">
          <nuxt-link to="/profile/settings">settings</nuxt-link>
        </li>
      </ul>
    </div>

    <div class="grid grid-profile mb-1">
      <div class="profile-image">
        <img v-if="imageUrl" :src="imageUrl" alt="image" class="mb-1" />
        <input name="file" type="file" @change="uploadNewImage" />
      </div>
      <div class="profile-data">
        <ul class="grid data-fields">
          <li class="labels">email:</li>
          <li>{{ user.email }}</li>
          <li class="labels">first name:</li>
          <li><input type="text" v-model="first_name" /></li>
          <li class="labels">last name:</li>
          <li><input type="text" v-model="last_name" /></li>
          <li class="labels">gender:</li>
          <li>
            <select v-model="gender">
              <option
                v-for="(option, idx) in options"
                :value="option.value"
                :key="idx"
              >
                {{ option.text }}
              </option>
            </select>
          </li>
          <li class="labels">birthday:</li>
          <li><input type="date" v-model="birthday" /></li>
          <li class="labels">reg_date:</li>
          <li>{{ new Date(user.reg_date).toLocaleDateString() }}</li>
          <li class="labels">address:</li>
          <li><input type="text" v-model="address" /></li>
        </ul>
        <button @click="saveUsersData">save</button>
      </div>
      <div class="profile-settings">
        <div class="">
          <p>change password</p>
        </div>
        <form>
          <div class="">
            <input
              type="password"
              v-model="newPassword"
              placeholder="new password"
              autocomplete="off"
            />
          </div>
          <div class="">
            <input
              type="password"
              v-model="repeatPassword"
              placeholder="repeat"
              autocomplete="off"
            />
          </div>
          <button @click="changePassword">change password</button>
          <div v-if="newPasswordError">mismatch</div>
        </form>
      </div>
    </div>
    {{user}}
  </div>
</template>

<style lang="scss" scoped>
// $color-grey: #eeeeee;
.profile {
  .grid-profile {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    > div {
      // padding: 1rem;
    }
    .profile-image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 17rem;
        height: 17rem;
      }
    }
    .profile-data {
      .data-fields {
        margin: 0;
        padding: 0;
        grid-auto-rows: 3rem;
        grid-template-columns: 1fr 3fr;
        li {
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
          &:nth-child(4n-2) {
            background: $color-grey;
          }
           &:nth-child(4n-3) {
            background: $color-grey;
          }
        }

        .labels {
          display: flex;
          justify-content: flex-end;
          padding-right: 0.5rem;
          white-space: nowrap;
        }
      }
    }
    .profile-settings {
      background: rgb(228, 228, 228);
      padding: .5rem;
      form {
        >div {
          margin-bottom: .5rem;
        }
      }
    }
  }
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "profile",
  layout: 'empty',
  middleware: ["auth"],
  data() {
    return {
      newPassword: "",
      repeatPassword: "",
      first_name: this.$store.state.auth.user.first_name,
      last_name: this.$store.state.auth.user.last_name,
      address: this.$store.state.auth.user.address,
      gender: this.$store.state.auth.user.gender,
      birthday: new Date(
        new Date(this.$store.state.auth.user.birthday).getTime() -
          new Date(this.$store.state.auth.user.birthday).getTimezoneOffset() *
            60000
      )
        .toISOString()
        .split("T")[0],
      avatar: this.$store.state.auth.user.avatar,
      newAvatar: null,
      options: [
        { text: "none", value: "n" },
        { text: "male", value: "m" },
        { text: "female", value: "f" },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "user"]),
    newPasswordError() {
      return this.newPassword !== this.repeatPassword;
    },
    imageUrl() {
      const DEF_AVATAR = `avatar_${this.gender}.png`;
      return this.newAvatar
        ? URL.createObjectURL(this.newAvatar)
        : this.avatar
        ? `avatar/${this.avatar}`
        : DEF_AVATAR;
    },
    showRole() {
      return this.$store.state.auth.user.role_id;
    },
  },
  methods: {
    uploadNewImage(e) {
      this.newAvatar = e.target.files[0];
    },
    async saveUsersData() {
      let updateData = {
        first_name: this.first_name,
        last_name: this.last_name,
        address: this.address,
        gender: this.gender,
        birthday: this.birthday,
      };

      if (this.newAvatar) {
        const FORM = new FormData();
        FORM.append("id", this.user.user_id);
        FORM.append("type", "avatar");
        FORM.append("file", this.newAvatar);
        try {
          let result = await this.$axios.$post("/uploads/", FORM, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          updateData.avatar = result.filename;
        } catch (error) {
          console.error(error.response.data);
        }
      }
      try {
        await this.$store.dispatch("users/update", updateData);
        console.log("updated");
      } catch (error) {
        console.error(error);
      }
    },
    async changePassword() {
      if (!this.newPasswordError && this.newPassword.length > 3) {
        const RESULT = await this.$store.dispatch("users/changePassword", {
          password: this.newPassword,
        });
        console.log(RESULT.message);
      } else {
        console.error("passwords mismath or short");
      }
    },
  },
};
</script>




