<template>
  <div class="detail">
    <search-input>
      <template #rightMenu>
        <a-page-header
          title="返回"
          @back="() => $router.push('/')"
          style="cursor: pointer;"
          @click="$router.push('/')"
        />
      </template>
      <template #default>
        <span class="title">{{ book.title }}</span>
      </template>
    </search-input>
    <div class="wapper">
      <div class="book-info">
        <img v-lazy="book.bookPic" alt="" />
        <div class="content">
          <h1>{{ book.title }}</h1>
          <div>
            <a
              href="javascript:;"
              v-for="down in book.downloadInfos"
              :key="down.name"
              class="download"
            >
              <a-button type="primary">
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
          <span>{{ book.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput'
export default {
  name: 'detail',
  props: {
    book: Object,
    keyword: ''
  },
  components: {
    SearchInput
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
