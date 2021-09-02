<template>
  <div class="admin-users-edit">
    <div><h3>{{$route.params}}</h3></div>

    <div class="grid grid-user">
      <div class="user-image">
        <img src="/no_image.jpg"/>

      </div>

      <div class="user-data">
        <div>user</div>
        <div>{{user}}</div>

      </div>

      <div class="user-settings">
        <div>settings</div>
        <button>delete</button>
        <select>
            <option>aaa</option>
            <option>bbb</option>
            <option>vvv</option>
          </select>
          <input type="checkbox">
      </div>

      <div class="user-additional">
        <div class="add-wishlist">
          <div>wishlist</div>
          <div v-for="item in addons.wishlist" :key="item.product_id">
            {{item}}
          </div>
        </div>
        <div class="add-comments">
          <div>comments</div>
          <div v-for="comment in addons.comments" :key="comment.product_id">
            {{comment}}
          </div>
        </div>
      </div>
    </div>

      <!-- <div>{{ new Date(user.reg_date).toLocaleDateString() }}</div> -->
      <!-- <div>{{ new Date(user.birthday).toLocaleDateString() }} ({{new Date().getFullYear() - new Date(user.birthday).getFullYear()}})</div> -->
      <!-- <div>{{user.gender === 'm'? 'male': user.gender === 'f'?'female':'nobody'}}</div> -->

  </div>
</template>

<style lang="scss" scoped>
.admin-users-edit {
  .grid-user {
    grid-template-columns: repeat(3, 1fr);
  }

  .user-image {
    background: lightblue;
  }
  .user-data {
    background: rgb(173, 230, 178);
  }
  .user-settings {
    background: rgb(230, 177, 173);
  }
  .user-additional {
    background: lightblue;
    grid-column-start: 1;
    grid-column-end: 4;
    display: flex;
    .add-wishlist {
      background: rgb(229, 230, 173);
      flex: 1;
    }
    .add-comments {
      background: rgb(217, 173, 230);
      flex: 1;
    }
  }
}
</style>

<script>
export default {
  name: 'admin-users-edit-id',
  async asyncData({ $axios, params }) {
    console.log('admin-users-edit-id');
    console.log('/users/' + params.id + '/addons');
    try {
      const [USERDATA, ADDONS] = await Promise.all([
        $axios.$get('/users/' + params.id),
        $axios.$get('/users/' + params.id + '/addons'),
      ]);
      return { user: USERDATA, addons: ADDONS };
    } catch (err) {
      console.error(err.message);
    }
  },
};
</script>
