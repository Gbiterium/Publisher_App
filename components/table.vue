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
        <template #table-colgroup="scope">
          <template v-for="field in scope.fields">
            <col
              v-if="field.key === 'email'"
              :key="field.key"
              :style="{ width: '15rem' }"
            />
            <col
              v-else-if="field.key === 'house_color'"
              :key="field.key"
              :style="{ width: '8rem' }"
            />
            <col
              v-else-if="field.key === 'DOB'"
              :key="field.key"
              :style="{ width: '7rem' }"
            />
            <col
              v-else-if="field.key === 'status'"
              :key="field.key"
              :style="{ width: '7rem' }"
            />
            <col
              v-else-if="field.key === 'connected'"
              :key="field.key"
              :style="{ width: '10rem' }"
            />
            <col
              v-else-if="field.key === 'grade_books'"
              :key="field.key"
              :style="{ width: '5rem' }"
            />
            <col
              v-else-if="field.key === 'excercises'"
              :key="field.key"
              :style="{ width: '6rem' }"
            />
            <col
              v-else-if="field.key === 'lesson_count'"
              :key="field.key"
              :style="{ width: '3rem' }"
            />
            <col
              v-else-if="field.key === 'grade'"
              :key="field.key"
              :style="{ width: '6rem' }"
            />
            <col v-else :key="field.key" :style="{ width: '' }" />
          </template>
        </template>
        <template #cell(date_available)="data">
          <slot name="date_available" :data="data">
            {{ data.value ? data.value : "      " }}
          </slot>
        </template>
        <template #cell(grade_levels)="data">
          <slot name="grade_levels" :data="data">
            {{ data.value }}
          </slot>
        </template>

        <template #cell(description)="data">
          <slot name="description" :data="data">
            {{ data.value }}
          </slot>
        </template>

        <template #cell(last_name)="data">
          <slot name="last_name" :data="data">
            {{ data.value }}
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
        <template #cell(is_active)="data">
          <slot name="is_active" :data="data">
            {{ data.value ? data.value : "      " }}
          </slot>
        </template>
        <template #cell(date_due)="data">
          <slot name="date_due" :data="data">
            {{ data.value ? data.value : "   " }}
          </slot>
        </template>
        <template #cell(grades)="data">
          <slot name="grades" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(grade)="data">
          <slot name="grade" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(school_class)="data">
          <slot name="school_class" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(DOB)="data">
          <slot name="DOB" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(admission_number)="data">
          <slot name="admission_number" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(format)="data">
          <slot name="format" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(relative_url)="data">
          <slot name="relative_url" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(file_url)="data">
          <slot name="file_url" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(subjects)="data">
          <slot name="subjects" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #cell(author)="data">
          <slot name="author" :data="data">
            {{ data.value }}
          </slot>
        </template>
        <template #head(check)="row">
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <div class="shift-left">
            <b-form-checkbox
              ref="tableCheckBox"
              v-model="row.detailsShowing"
              @change="selectAllRows"
              @click="selectAllRows"
            >
            </b-form-checkbox>
          </div>
        </template>

        <template #cell(house_color)="data">
          <div
            v-if="data.value"
            class="text-center"
            :style="{
              borderColor: data.value,
              color: data.value,
              border: '1px solid',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.3rem',
            }"
          >
            {{ data.item.house | wrapHouse }}
          </div>
        </template>
        <template #cell(invoice_state)="data">
          <slot name="invoice_state" :data="data"> </slot>
        </template>
        <template #cell(linked)="data">
          <slot name="linked" :data="data"> </slot>
        </template>

        <!-- <template #cell(status)="data">
          <slot name="status" :data="data">
            <div
              v-if="data.value === true"
              class="text-center text-success"
              :style="{
                border: '1px solid',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.3rem',
              }"
            >
              Linked
            </div>
            <div
              v-else
              class="text-center"
              :style="{
                border: '1px solid',
                padding: '0.25rem 0.4rem',
                borderRadius: '0.3rem',
              }"
            >
              Not linked
            </div>
          </slot> </template
        > -->
        <template #cell(stats)="data">
          <div
            class="text-capitalize"
            :class="
              data.value === 'marked'
                ? 'text-success'
                : data.value === 'started'
                ? 'text-warning'
                : data.value === 'submitted'
                ? 'text-info'
                : 'text-warning'
            "
          >
            {{
              data.value === "marked"
                ? "Graded"
                : data.value === "Not Graded"
                ? "Not Submitted"
                : data.value
            }}
          </div>
        </template>
        <template #cell(statusExercise)="data">
          <slot name="statusExercise" :data="data">{{ data.value }}</slot>
        </template>
        <template #cell(deleteExercise)="data">
          <slot name="deleteExercise" :data="data">{{ data.value }}</slot>
        </template>
        <template #cell(quiz_type)="data">
          <slot name="quiz_type" :data="data">{{ data.value }}</slot>
        </template>
         <template #cell(name)="data">
          <slot name="name" :data="data">{{ data.value }}</slot>
        </template>
        <template #cell(start)="data">
          <slot name="start" :data="data">{{ data.value }}</slot>
        </template>
        <template #cell(three_dots_student)="data">
          <slot name="three_dots_student" :data="data">{{ data.value }}</slot>
        </template>
        <template #cell(attempt)="data">
          <slot name="attempt" :data="data">{{ data.value }}</slot>
        </template>
        <template #cell(book)="data">
              <div class="d-flex align-items-center book">
                <img :src="require(`@/assets/img/${data.value.image}`)">
                <span>{{ data.value.name }}</span>
              </div>
            </template>
        <template #cell(created_at)="data">
          <div>{{ data.value.slice(0, 11) }}</div>
        </template>

        <template #cell(substitute_teacher)="data">
          <template v-for="(teacher, index) in data.value">
            <div :key="index">
              {{ teacher.teacher_name }}<span v-if="data.value.length > 1">,</span>
            </div>
          </template>
        </template>
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(relationship)="row">
          <div class="text-capitalize">
            {{ row.value }}
          </div> </template
        >
        <template #cell(check)="row">
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <span @click="toggleSingleRow(row)">
            <div>
              <b-form-checkbox v-model="row.rowSelected" @change="row.toggleDetails">
              </b-form-checkbox>
            </div>
          </span>
        </template>

        <template #cell(email)="data">
          <div>
            {{ data.value | wrapEmail }}
          </div>
        </template>
        <template #cell(three_dots)="data">
          <slot name="three_dots" :data="data">
            <div>
              <b-dropdown
                size="lg"
                variant="link"
                menu-class="w-25 customdots"
                class="cutom2"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <span class="iconify" data-icon="bi:three-dots-vertical"></span>
                </template>
                <b-dropdown-item href="#" @click="edit(data)">Edit</b-dropdown-item>
                <b-dropdown-item href="#" @click="remove(data)">
                  <span class="text-danger"> Delete </span>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </slot>
        </template>
        <template #cell(triple_dots)="data">
          <div>
            <slot name="triple_dots" :data="data">
              <b-dropdown
                size="lg"
                variant="link"
                menu-class=""
                class="cutom2"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <span class="iconify" data-icon="bi:three-dots-vertical"></span>
                </template>
                <template v-for="(item, index) in data.value">
                  <b-dropdown-item
                    :key="index"
                    href="#"
                    class=""
                    :variant="item.variant ? item.variant : ''"
                    @click="$emit(item.event, data.item)"
                    >{{ item.name }}</b-dropdown-item
                  >
                </template>
              </b-dropdown>
            </slot>
          </div>
          <!-- <div @click="handleDots(data)">
            <span class="iconify" data-icon="bi:three-dots-vertical"></span>
          </div> -->
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        </template>
        <template #cell(id)>
          <div></div>
        </template>
        <template #head(id)>
          <div></div>
        </template>
        <template #cell(theme)="data">
          <div
            class="rounded-circle"
            style="height: 25px; width: 25px"
            :style="{ backgroundColor: data.value }"
          ></div>
        </template>
        <template #cell()="data">
          <div class="border-primary singular" @click="redirect(data)">
            {{ data.value }}
          </div>
        </template>
        <template #cell(gender)="data">
          <slot name="gender" :data="data">
            <div class="border-primary singular text-capitalize">
              {{ data.value }}
            </div>
          </slot>
        </template>
        <template #cell(role)="data">
          <div class="border-primary singular text-capitalize">
            {{ data.value }}
          </div>
        </template>
        <template #head(extra_icons)>
          <div></div>
        </template>
        <template #cell(extra_icons)="data">
          <slot name="extra_icons" :data="data">
            <div class="d-flex justify-content-end">
              <div class="pr-2">
                <span class="mx-2" @click="iconDelete(data)">
                  <span class="iconify text-danger" data-icon="mi:delete"></span>
                </span>
                <span class="mx-2">
                  <span class="iconify" data-icon="ant-design:edit-twotone"></span>
                </span>
                <a id="a1" download="file1.png" @click="iconDownload(data)">
                  <span class="iconify" data-icon="feather:download"></span>
                </a>
              </div>
            </div>
          </slot>
        </template>
        <template #head(image)="">
          <div></div>
        </template>

        <template #cell(primary_contact)="data">
          <div class="m-0">
            <span v-if="data.value == true" class="text-primary"> Emergency</span>
          </div>
        </template>
        <template #cell(connected)="data">
          <div class="m-0" :style="{ position: 'relative', right: '1rem' }">
            <div
              v-if="data.value == true"
              class="border w-100 text-center border-primary rounded p-1 text-primary"
            >
              Connected
            </div>
            <div v-else class="border w-100 rounded border-primary p-2">
              {{ $route.params.id }}-{{ data.item.activation_code }}
            </div>
          </div>
        </template>
        <template #cell(mimetype)="data">
              <div class="" style="max-width: 1rem">
                <div v-if="data.value.includes('pdf')" class="pdf"
                  ><span class="iconify" data-icon="bi:file-pdf"></span></div
                >
                <div v-else-if="data.value.includes('presentation')" class="ppt"
                  ><span class="iconify" data-icon="file-icons:microsoft-powerpoint"></span></div
                >
                <div v-else-if="data.value.includes('msword') || data.value.includes('.document')" class="msword"
                  ><span class="iconify" data-icon="file-icons:microsoft-word"></span></div
                >
                <div v-else-if="data.value.includes('mp4')"
                  ><span class="iconify" data-icon="teenyicons:mp4-solid"></span></div
                >
                <div v-else-if="data.value.includes('image')"
                  ><span class="iconify" data-icon="ic:baseline-image"></span></div
                ><div v-else-if="data.value.includes('.sheet')" class="excel"
                  ><span class="iconify" data-icon="file-icons:microsoft-excel"></span></div
                >
                </div>
                
              </template>
              <template #cell(size)="data">
              <div style="max-width: 16rem">
                  {{ data.value ? data.value : '0kb' }}
              </div>
            </template>
              <template #cell(last_modified)="data">
              <div class="fs-12">
                  {{ data.value }}
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
.table_container {
  border-radius: 10px;
  background-color: white;
  padding: 0px 10px 5px 20px;
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
  padding-left: 0.75rem !important;
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
</style>
