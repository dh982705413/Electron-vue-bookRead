<template>
  <div class="books">
    <search-input>
      <template #default>
        已下载书籍
      </template>
      <template #rightMenu>
        <a-button type="primary" @click="$router.push('/')">
          <a-icon type="left" />返回
        </a-button>
      </template>
    </search-input>
    <a-row :gutter="16" style="margin-left:40px">
      <a-col
        :span="8"
        v-for="(item, i) in books"
        :key="i"
        style="margin-top:20px"
      >
        <a-card
          hoverable
          style="width: 240px;height:400px"
          @click="openBook(item)"
        >
          <img
            v-lazy="item.imgUrl"
            style="width:238px;height:300px"
            slot="cover"
          />
          <a-card-meta :title="item.title">
            <template slot="description">
              <p class="textomit-2 ">
                {{ item.metadata.title }}
              </p>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
const EPub = require('epub')
const fs = require('fs')
export default {
  name: 'books',
  components: {
    SearchInput
  },
  data() {
    return {
      books: []
    }
  },
  mounted() {
    let files = fs.readdirSync('book')
    files.forEach(file => {
      let epub = new EPub('book/' + file)
      epub.on('end', () => {
        epub.title = epub.filename.slice(19)
        epub.getImage(epub.metadata.cover, (error, img, mimeType) => {
          if (!error) {
            epub.imgUrl = `data:${mimeType};base64,` + img.toString('base64')
            this.$forceUpdate()
          }
        })
        this.books.push(epub)
      })
      epub.parse()
    })
  },
  methods: {
    openBook(book) {
      this.$router.push({
        name: 'bookDetail',
        params: { book }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
