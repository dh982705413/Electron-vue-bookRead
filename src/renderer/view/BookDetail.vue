<template>
  <div class="book-detail">
    <search-input>
      <template #default>
        {{ title }}
      </template>
      <template #rightMenu>
        <a-button type="primary" @click="$router.push('/books')">
          <a-icon type="left" />返回
        </a-button>
      </template>
    </search-input>
    <div class="container" v-if="bookDetail">
      <div class="left">
        <a-menu style="width: 300px" mode="inline">
          <a-menu-item
            :key="index"
            v-for="(item, index) in bookDetail.toc"
            v-show="item.title"
            @click="handleItem(item)"
          >
            <a-icon type="book" /> {{ item.title }}
          </a-menu-item>
        </a-menu>
      </div>
      <div class="right" v-html="content"></div>
    </div>
    <div v-else>无数据</div>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput'
export default {
  name: 'book-detail',
  components: {
    SearchInput
  },
  computed: {
    title() {
      return this.bookDetail ? this.bookDetail.title.split('.')[0] : ''
    }
  },
  data() {
    return {
      bookDetail: this.$route.params.book,
      content: ''
    }
  },
  methods: {
    handleItem(chapter) {
      if (this.bookDetail) {
        this.bookDetail.getChapter(chapter.id, (err, text) => {
          if (!err) {
            this.content = text
          }
        })
      }
    }
  },
  mounted() {
    if (this.bookDetail) {
      this.content = `<img src="${this.bookDetail.imgUrl}" style="width:300px;height:400px;margin-left:150px;margin-top:50px"/>`
      this.bookDetail.getFile('css', (errpr, data, mimeType) => {
        let style = document.createElement('style')
        style.innerHTML = data.toString()
        document.head.appendChild(style)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.book-detail {
  .container {
    display: flex;
    width: 100%;
    .left {
      width: 300px;
    }
    .right {
      padding: 20px;
      flex: 1;
    }
  }
}
</style>
