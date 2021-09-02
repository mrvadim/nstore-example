<template>
  <div class="">
    <div class="mb-3">
      <h2 class="title">{{ $t("setup") }}</h2>
      <p>version: {{ $config.VERSION }}</p>
    </div>

    <div class="mb-3">
      <h3 class="title">Создание бекапа:</h3>
      <pre>
pg_dump -h {{ hostname }} -U postgres -W -F t {{ database }} > backup.tar</pre
      >
      <p>Postgres клиент:</p>
      <pre>psql -h {{ hostname }} -U postgres -W</pre>
      <p>Создание базы:</p>
      <pre>CREATE DATABASE {{ database }} with owner=pguser;</pre>
      <p>Восстановление бекапа:</p>
      <pre>
pg_restore -h {{ hostname }} -U postgres --no-owner --role=pguser -d {{
          database
        }} -v backup.tar</pre
      >
    </div>
    <div class="mb-3">
      <h3 class="title">options</h3>
      <p>option: show on page</p>
      <p>option: hide email</p>
    </div>

    <div class="mb-3">
      <h3 class="title">Links</h3>
      <p>
        https://github.com/nuxt-community/community-modules/tree/master/packages/toast
      </p>

      <p>
        https://stackoverflow.com/questions/59923082/pass-the-id-number-in-the-link-using-nuxt-link
      </p>

      <p>
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      </p>
      https://medium.com/maddevs-io/kak-nastroit-apollo-graphql-v-nuxt-prilozhenii-d59d5ec7392a
      <p></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "setup",
  layout: "empty",
  data() {
    return {
      hostname: "IP",
      database: "DB",
    };
  },
  methods: {},
};
</script>
