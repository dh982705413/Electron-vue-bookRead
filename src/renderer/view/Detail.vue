<template>
  <div class="detail">
    <search-input>
      <template #rightMenu>
        <a-button type="primary" @click="$router.push('/')">
          <a-icon type="left" />返回
        </a-button>
      </template>
      <template #default>
        <span class="title">{{ bookDetail.title }}</span>
      </template>
    </search-input>
    <div class="wapper">
      <div class="book-info">
        <img v-lazy="bookDetail.bookPic" alt="" />
        <div class="content">
          <h1>{{ bookDetail.title }}</h1>
          <div>
            <a
              href="javascript:;"
              v-for="down in bookDetail.downloadInfos"
              :key="down.name"
              class="download"
            >
              <a-button
                type="primary"
                @click="download(down.url, down.name, bookDetail.title)"
              >
                <a-icon type="download" /> {{ down.name }}
              </a-button>
            </a>
          </div>
        </div>
      </div>
      <div class="book-detail">
        <p>作品简介</p>
        <div>
          <h2>内容简介</h2>
          <span>{{ bookDetail.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput'
const fs = require('fs')
export default {
  name: 'detail',
  props: {
    book: String,
    keyword: ''
  },
  components: {
    SearchInput
  },
  computed: {
    bookDetail() {
      return JSON.parse(this.book)
    }
  },
  methods: {
    async download(url, type, title) {
      const data = await this.$http({
        method: 'get',
        url,
        responseType: 'stream'
      })
      data.pipe(fs.createWriteStream(`book/${title}.${type}`))
      data.on('end', () => {
        this.$message.success(`${title}.${type}下载完成!`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.detail {
  .title {
    font-size: 18px;
    font-weight: 600;
  }
  .wapper {
    width: 980px;
    margin: 0 auto;
    .book-info {
      margin-top: 30px;
      @include flex();
      img {
        width: 218px;
      }
      .content {
        height: 300px;
        margin-left: 40px;
        @include flex(start, center, column);
        h1 {
          font-size: 30px;
          margin-bottom: 30px;
        }
        .download {
          margin-right: 15px;
        }
      }
    }
    .book-detail {
      p {
        color: #1890ff;
        font-size: 20px;
        padding: 20px 0;
        border-bottom: 1px solid #e0e0e0;
      }
      h2 {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
}
</style>
