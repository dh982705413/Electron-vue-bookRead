<template>
  <div class="search">
    <search-input @search="onSearch" v-model="keyword" size="mini">
      <template #rightMenu>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            切换模式 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="isDouble = false">单行</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="isDouble = true">双行</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </search-input>
    <ul class="book-list">
      <li
        v-for="book in searchList"
        :key="book.id"
        class="book-item"
        :class="{ co2: isDouble }"
        @click="$router.push({ name: 'detail', params: { book } })"
      >
        <div class="img-wapper">
          <img v-lazy="book.bookPic" alt="" />
        </div>
        <div class="book-info">
          <h4 class="title">{{ book.title }}</h4>
          <p class="description textomit">
            {{ book.description }}
          </p>
          <div class="downloadInfos">
            <router-link
              v-for="download in book.downloadInfos"
              :key="download.name"
              :to="{ name: 'detail', params: { book } }"
              >{{ download.name }}</router-link
            >
          </div>
          <span class="siteName">{{ book.siteName }}</span>
        </div>
      </li>
    </ul>
    <a-pagination
      :total="total"
      :page-size="20"
      v-model="current"
      @change="onChange"
      v-show="searchList.length"
      class="pagination"
    />
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput'
export default {
  name: 'dh',
  components: {
    SearchInput
  },
  created() {
    this.onSearch()
  },
  data() {
    return {
      searchList: [],
      pageSize: 20,
      current: 1,
      total: 0,
      keyword: '',
      isDouble: false
    }
  },
  methods: {
    async onSearch() {
      const { data: res } = await this.$http.get(`/api/search/v3`, {
        params: {
          q: this.keyword
        }
      })
      this.current = 1
      this.searchList = res.content
      this.total = res.totalElements
    },
    async onChange() {
      const { data: res } = await this.$http.get(`/api/search/v3`, {
        params: {
          q: this.keyword,
          pageNo: this.current - 1
        }
      })
      this.searchList = res.content
    }
  }
}
</script>

<style lang="scss" scope>
@import '../assets/scss/mixin';
@import '../assets/scss/_var';
.search {
  .book-list {
    @include flex(space-between, center, row, wrap);
    margin: 20px;
    .book-item {
      @include flex();
      width: 1000px;
      height: 210px;
      margin-bottom: 15px;
      cursor: pointer;
      .img-wapper {
        width: 150px;
        height: 210px;
        img {
          width: 150px;
          height: 210px;
        }
      }
      .book-info {
        height: 210px;
        @include flex(space-between, start, column, wrap);
        margin-left: 10px;
        .title {
          font-size: 22px;
          font-weight: 500;
        }
        .downloadInfos {
          a {
            color: $download;
            &:hover {
              color: $downloadhover;
            }
          }
          a:not(:last-of-type)::after {
            content: '|';
            color: $download;
            margin: 0 5px;
          }
        }
        .siteName {
          color: $siteNme;
        }
      }
    }
    .co2 {
      width: 480px;
    }
  }
  .pagination {
    position: sticky;
    height: 50px;
    line-height: 50px;
    bottom: 0;
    background-color: #ffffff;
    border-top: 1px solid #e0e0e0;
    text-align: center;
  }
}
</style>
