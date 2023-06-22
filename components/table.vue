<template>
  <div class="rounded">
    <div class="mt-2 bg-white table_container px-auto table-responsive text-capitalize">
      <div
        v-if="showSpinner"
        class="d-flex align-items-center align-content-center justify-content-center"
      >
        <span class="mr-3 fs-14"> Downloading attachment...</span>
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
      <b-table
      striped
        ref="selectableTable"
        :fixed="fixed"
        hover
        stacked="md"
        responsive
        :fields="fields"
        show-empty
        :items="items"
        :busy="isBusy"
        class="custom-table"
        :filter="filter"
        sort-icon-left
        table-class="custom-table pointer my-table-class"
        tbody-class=""
        details-td-class="my-table-class"
        tbody-tr-class="my-table-class"
        :filter-included-fields="filterOn"
        :sort-desc.sync="sortDesc"
        selectable
        selected-variant="info"
        no-select-on-click
        @row-clicked="$emit('row-clicked', $event)"
        @row-selected="onRowSelected"
        @filtered="onFiltered"
      >
        <template #empty="scope">
        <div class="text-center py-2 my-2">
          <img src="../assets/img/empty-list.svg" class="img-fluid" />
          <div class="fs-14 text-black mt-2 text-capitalize">
            {{ scope.emptyText }}
          </div>
          <!-- <div class="mt-4"></div> -->
        </div>
        <!-- <h4>{{ scope.emptyText }}</h4> -->
      </template>
      <template #emptyfiltered="scope">
        <h4>{{ scope.emptyFilteredText }}</h4>
      </template>
        <template #cell(date_available)="data">
          <slot name="date_available" :data="data">
            {{ data.value ? data.value : "      " }}
          </slot>
        </template>
        <template #cell(bill_status)="data">
          <slot name="bill_status" :data="data">
            {{ data.value ? data.value : "      " }}
          </slot>
        </template>
        <template #cell(updated_at)="data">
          <slot name="updated_at" :data="data">
            {{ data.value ? data.value : "      " }}
          </slot>
        </template>
        <template #cell(created_on)="data">
          <slot name="updated_at" :data="data">
            {{ data.value ? data.value : "      " }}
          </slot>
        </template>
        <template #cell(format)="data">
          <slot name="format" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(author)="data">
          <slot name="author" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(book)="data">
              <div class="d-flex align-items-center book">
                <img :src="`${$config.BASE_URL}${data.item.book_cover}`">
                <div class="ml-2">
                <div>{{ data.item.name }}</div>
                <div class="text-grey mt-1">Author: {{ data.item.author }}</div>
                <div class="text-grey mt-1 text-capitalize">Categories: {{ data.item.categories.join(", ") }}</div>
              </div>
              </div>
            </template>
            <template #cell(title)="data">
              <div :style="{ width: '550px' }">
              <div class="d-flex align-items-center content">
                <img v-if="data.item.thumbnails.length > 0" :src="`${$config.BASE_URL}${data.item.thumbnails[0].image}`">
                <div v-else class="no-thumbnail"></div>
                <div class="ml-2">
                <div class="fs-14 text-capitalize">{{ data.item.title }}</div>
                <div class="text-grey mt-1 fs-12">{{ truncate(data.item.description, 140) }}</div>
                <div class="text-grey mt-1 text-capitalize fs-12">{{ data.item.subject.map((el) => el.name).join(", ") }}</div>
                <div class="text-grey mt-1 text-capitalize fs-12">{{ data.item.grade_levels.join(", ") }}</div>
                <div v-if="data.item.content_type === 'video'" class="icon mt-1">
                  <img src="@/assets/img/video2.png" />
                </div>
                <div v-if="data.item.content_type === 'document' || data.item.content_type === 'worksheet'" class="icon mt-1">
                  <img src="@/assets/img/document.png" />
                </div>
                <div v-if="data.item.content_type === 'game'" class="icon mt-1">
                  <img src="@/assets/img/game.png" />
                </div>
              <span v-if="data.item.content_type === 'quiz'" class="iconify fs-21 text-grey" data-icon="material-symbols:assignment-outline"></span>
              </div>
              </div>
              </div>
            </template>
            <template #cell(content_type)="data">
              <span v-if="data.item.content_type === 'video'" class="iconify" data-icon="bi:play-circle-fill"></span>
              <span v-if="data.item.content_type === 'document'" class="iconify" data-icon="file-icons:microsoft-word"></span>
              <span v-if="data.item.content_type === 'worksheet'" class="iconify" data-icon="vscode-icons:file-type-pdf2"></span>
              <span v-if="data.item.content_type === 'game'" class="iconify" data-icon="vscode-icons:file-type-zip"></span>
              <span v-if="data.item.content_type === 'quiz'" class="iconify" data-icon="material-symbols:assignment"></span>
              </template>
            <template #cell(grade_levels)="data">
              <div class="text-capitalize">{{ data.value ? data.value.join(", ") : "" }}</div>
            </template>
            <template #cell(categories)="data">
              <div class="text-capitalize">{{ data.value ? data.value.join(", ") : "" }}</div>
            </template>
            <template #cell(shelf)="data">
              <div>{{ data.value ? data.value : 0 }}</div>
            </template>
            <template #cell(book_cover)="data">
              <div class="d-flex align-items-center book">
                <img :src="`${$config.BASE_URL}${data.item.book_cover}`">
                <div class="ml-2">
                <!-- <div>{{ data.item.name }}</div> -->
                <div class="mt-1 text-capitalize"> {{ data.item.book_name }}</div>
                <!-- <div class="text-grey mt-1 text-capitalize">Categories: {{ data.item.categories.join(", ") }}</div> -->
              </div>
              </div>
            </template>
            <template #cell(actions)="data">
              <slot name="actions" :data="data">
          {{ data.value }}
        </slot>
            </template>
            <template #cell(views)="data">
              <div>
                <div class="">{{ data.value ? data.value : '0'}}</div>
              </div>
            </template>
            <template #cell(status)="data">
              <div>
                <div v-if="data.value === 'PUBLISHED'" class="text-blue text-capitalize">Published</div>
                <div v-if="data.value === 'DRAFT' || !data.value" class="text-grey">Draft</div>
                <div v-if="data.value === 'AWAITING_APPROVAL'" style="color: #FFAB07">Under Review</div>
              </div>
            </template>
            <template #cell(total_earnings)="data">
              <div>
                <div>NGN {{ data.value }}</div>
              </div>
            </template>
            <template #cell(average_rating)="data">
                <star-rating :rating="data.value ? data.value : 0" :show-rating="false" :max-rating="5" :read-only="true" :star-size="18"></star-rating>
              <!-- </div> -->
            </template>
            <template #table-busy>
        <div class="p-4">
          <b-skeleton-table
            :rows="4"
            :columns="5"
            :table-props="{ bordered: true, striped: true }"
          ></b-skeleton-table>
        </div>
      </template>
      </b-table>
    </div>

    <div v-show="showPagination" class="mt-3">
      <div class="d-flex justify-content-end">
        <div v-if="recordCount" class="w-50 d-flex justify-content-end">
          <div class="mr-3">
            <div v-if="!isBusy" class="text-pri-blue mt-1">
              {{ showFrom }}-{{ showTo }} of {{ totalRecords }}
            </div>
          </div>

          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
            size="sm"
            class="my-0"
            @input="pageNumber"
            @change="$emit('page-changed', $event)"
          ></b-pagination>
        </div>
      </div>

      <!-- {{selected}} -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    recordCount: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 12,
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false,
    },
    showPagination: {
      type: Boolean,
      required: false,
      default: true,
    },
    fields: {
      type: Array,
      required: false,
      default: () => [],
    },

    sortDirection: {
      type: String,
      required: false,
      default: "asc",
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    filterOn: {
      type: Array,
      required: false,
      default: () => [],
    },
    filter: {
      type: String,
      required: false,
      default: null,
    },
    allowRedirect: {
      type: Boolean,
      required: false,
      default: false,
    },
    pages: {
      type: Number,
      default: 0,
    },
    newValue: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: 1,
      totalRows: 0,
      allSelected: false,
      selected: [],
      sortDesc: false,
      showSpinner: false,
    };
  },
  computed: {
    showFrom() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    showTo() {
      if (parseInt(this.showFrom) + parseInt(this.perPage) > this.recordCount) {
        // if the request perpage is more than the total number of record return the total number of records instead

        return this.recordCount ? this.recordCount : "Max";
      } else if (parseInt(this.currentPage) === 1) {
        return parseInt(this.perPage);
      } else {
        return parseInt(this.showFrom) + parseInt(this.perPage);
      }
    },
    totalRecords() {
      if (parseInt(this.showFrom) + parseInt(this.perPage) > this.recordCount) {
        // if the request perpage is more than the total number of record return the total number of records instead
        return this.recordCount ? this.recordCount : "Max";
      } else if (this.recordCount) {
        return parseInt(this.recordCount);
      } else {
        return parseInt(this.totalRows);
      }
    },
  },
  watch: {
    pages() {
      this.totalRows = this.perPage * this.pages;
    },
    newValue(newValue) {
      if (newValue) {
        this.currentPage = newValue;
      }
    },
  },
  mounted() {
    this.totalRows = this.perPage * this.pages;
  },

  methods: {
    edit(e) {
      this.$emit("edit", e);
      console.log(e.item);
    },
    remove(e) {
      this.$emit("remove", e.item);
      console.log(e);
    },
    iconDelete(e) {
      this.$emit("iconDelete", e.item);
    },
    async iconDownload(e) {
      console.log(e.item);
      this.showSpinner = true;
      try {
        const response = await axios.get(e.item.url, { responseType: "blob" });
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${e.item.file_name}${e.item.format}`;
        link.click();
        URL.revokeObjectURL(link.href);
        this.showSpinner = false;
      } catch (e) {
        console.error(e);
      }
    },
    pageNumber(e) {
      this.$emit("pageChange", e);
      console.log(e);
    },
    handleDots(data) {
      console.log(data);
    },
    redirect(e) {
      if (this.allowRedirect === true) {
        this.$router.push(`${e.item.route}/${e.item.id}`);
      }
    },
    onRowSelected(items) {
      this.$emit("single-row", items);
      this.selected = items;
    },
    selectAllRows() {
      if (this.allSelected) {
        this.$refs.selectableTable.clearSelected();
        this.allSelected = !this.allSelected;
        setTimeout(() => {
          this.$emit("allSelected", this.selected);
        }, 100);
      } else {
        this.$refs.selectableTable.selectAllRows();
        this.allSelected = !this.allSelected;
        setTimeout(() => {
          this.$emit("allSelected", this.selected);
        }, 100);
      }
    },
    truncate(source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    toggleSingleRow(i) {
      this.$emit("single-row-selected", i);
      if (i.rowSelected === true) {
        setTimeout(() => {
          this.$refs.selectableTable.unselectRow(i.index);
        }, 100);
      } else if (i.rowSelected === false) {
        setTimeout(() => {
          this.$refs.selectableTable.selectRow(i.index);
        }, 100);
      }

      // Rows are indexed from 0, so the third row is index 2
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.iconify:hover {
  cursor: pointer;
}
.icon img {
  width: 15px !important;
  height: auto !important;
  border-radius: 0px !important;
}
.table_container {
  border-radius: 10px;
  background-color: white;
  /* padding: 0px 10px 5px 20px; */
}
.singular:hover {
  cursor: pointer;
}
.cutom2 .dropdown-menu {
  min-width: 5rem !important;
}

.doWrap {
  max-width: 50%;
  word-wrap: break-word;
}
.minimum {
  max-width: 30px;
}
.widd {
  width: 7rem !important;
}
.my-table-class td div {
  /* padding-left: 0.75rem !important; */
  text-transform: none;
}
.text-pri-blue {
  color: #007bfe;
  font-family: Museo Sans;
  font-size: 15px;
}
.pdf .iconify {
  color: #DD2025;
}
.msword .iconify {
  color: #283C82;
}
.ppt .iconify {
  color: #DD2025;
}
.excel .iconify {
  color: #1d6f42;
}
.book img {
  height: 70px;
  width: 56px;
  object-fit: cover;
  object-position: center;
}
.content img {
  height: 110px;
  width: 110px;
  object-fit: cover;
  border-radius: 5px;
}
.no-thumbnail {
  height: 110px;
  width: 110px;
  border-radius: 5px;
  background: center no-repeat #6b9abf;
}
</style>
