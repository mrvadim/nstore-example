<template>
  <div>
    <div class="mb-1">
      <h1 class="title">{{ $t("telegram") }}</h1>
    </div>
    <div>
      <h2>settings</h2>
      <input type="text" v-model="bot_token" />
      <input type="text " v-model="chat_id" />
    </div>
    <div class="mb-1">
      <h2>send message</h2>

      <ul class="help">
        <li><b>strong text: </b>- *text*</li>
        <li><i>italic text: </i> - _text_</li>
        <li><u>underline text: </u>- __text__</li>
        <li><s>strikethrough text: </s>- ~text~</li>
        <li>
          emoji:
          <span class="emoji">😁</span>
          <span class="emoji">😉</span>
        </li>
        <li>
          <a href="https://apps.timwhitlock.info/emoji/tables/unicode">
            emoji unicode
          </a>
        </li>
      </ul>

      <div class="flex mb-1">
        <textarea v-model="message" cols="50" rows="5" class="mr-1" />
        <div class="preview mb-1">
          <p class="pre-formatted">{{ formatedPreview }}</p>
        </div>
      </div>

      <button @click="sendMessage">send message</button>
    </div>

    <div>
      <h2>send photo</h2>

      <input class="mb-1" name="file" type="file" @change="uploadNewImage" />
      <div class="flex mb-1">
        <div class="border square mr-1">
          <img class="image" v-if="imageUrl" :src="imageUrl" alt="image" />
        </div>

        <textarea
          v-model="photoCaption"
          cols="50"
          rows="5"
          class=""
          placeholder="caption"
        />
      </div>
      <button @click="sendPhoto">send photo</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'telegram',
  layout: 'empty',
  middleware: ['auth', 'isAdmin'],
  data() {
    return {
      bot_token: '',
      chat_id: '@n_store_channel',
      tg_url: 'https://api.telegram.org/bot',
      methods: {
        getMe: '/getMe',
        sendMessage: '/sendMessage',
        sendPhoto: '/sendPhoto',
      },
      headers: {
        json: { 'Content-Type': 'application/json' },
        form: { 'Content-Type': 'multipart/form-data' },
      },
      message: '',
      imageUrl: null,
      file: null,
      photoCaption: '',
    };
  },
  computed: {
    formatedPreview() {
      return this.message;
    },
  },
  methods: {
    async sendMessage() {
      const FORM = JSON.stringify({
        chat_id: this.chat_id,
        text: this.message,
        disable_notification: true,
      });
      this.request(this.methods.sendMessage, FORM, this.headers.json);
    },
    uploadNewImage(e) {
      this.file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(this.file);
    },
    async sendPhoto() {
      const FORM = new FormData();
      FORM.append('chat_id', this.chat_id);
      FORM.append('photo', this.file);
      FORM.append('caption', this.photoCaption);
      FORM.append('disable_notification', true);
      this.request(this.methods.sendPhoto, FORM, this.headers.form);
    },
    async request(method, data, headers) {
      console.log('request');

      try {
        const result = await this.$axios.$post(
          this.tg_url + this.bot_token + method,
          data,
          { headers }
        );
        console.log('result message', result);
        return result;
      } catch (error) {
        console.error('telegram', error);
        return error.message;
      }
    },
  },
};
</script>
