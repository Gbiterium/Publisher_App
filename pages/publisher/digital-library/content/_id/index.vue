<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="fs-24 font-weight-bold mb-4 text-capitalize">
        {{ content.title }}
      </div>
      <div>
      <button class="btn btn-light py-2 px-3 mb-3 mr-1" :disabled="isLoading" @click.prevent="handleDelete"><div class="d-flex align-items-center text-grey"><span class="iconify mr-1 text-grey" data-icon="ic:baseline-delete"></span>Delete <b-spinner
                class="ml-1"
                v-if="isLoading"
                label="Spinning"
                style="width: 1rem; height: 1rem"
              ></b-spinner></div></button>
      <button class="btn btn-light py-2 px-3 mb-3" @click.prevent="handleEdit"><div class="d-flex align-items-center text-grey"><span class="iconify mr-1 text-grey" data-icon="ic:round-mode-edit-outline"></span>edit</div></button>
      </div>
    </div>
        <div class="card">
          <div class="card-body py-xl-5 px-xl-5">
            <div class="row">
                <div class="col-lg-10 pr-5">
            <div class="fs-14 text-grey font-weight-600">DESCRIPTION</div>
            <p class="mt-1">{{ content.description }}</p>
            </div>
            <div class="col-lg-2">
                <div class="fs-14 text-grey font-weight-600">DATE UPLOADED</div>
                <p class="mt-1">{{ content.date_created }}</p>
            </div>
            </div>
            <div>
            <div class="text-grey fs-14 mt-3 font-weight-600">SUBJECT</div>
            <div class="d-flex">
            <div v-for="el in content.subject" :key="el.id" class="mt-2 mr-2">
            <span class="subject-container p-2 fs-14">{{ el.name }}</span>
            </div>
            </div>
            </div>
            <hr class="my-4" />
            <div class="row">
                <div class="col-lg-10 d-flex justify-content-end pr-5 file-container">
                    <div v-if="loading">
              <!-- <div class=" mt-3">
                <div class="mt-3"> -->
                  <b-skeleton width="550px" height="323px" />
                <!-- </div>
              </div> -->
            </div>
            <!-- <div v-if="content.content_type === 'video'">
                <video :src="`${$config.BASE_URL}${content.content_file}`" controls></video>
                </div> -->
                <div v-else>
                    <img :src="`${$config.BASE_URL}${thumbnail.image}`">
                    <div class="btn-abs">
                        <button v-if="content.content_type === 'document'" class=" btn btn-light border-none">Download Document</button>
                        <button v-if="content.content_type === 'worksheet'" class=" btn btn-light border-none">Download Worksheet</button>
                        <button v-if="content.content_type === 'game'" class=" btn btn-light border-none">Download Game</button>
                        </div>
                        <div class="icon-abs">
                        <span v-if="content.content_type === 'video'" class="iconify " data-icon="bi:play-circle-fill"></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 thumbnails-container">
                <div class="text-grey fs-14">Thumbnails</div>
                <div v-if="loading">
                <div class="mt-3">
                  <b-skeleton width="90px" height="56px" />
                </div>
                <div class="mt-3">
                  <b-skeleton width="90px" height="56px" />
                </div>
            </div>
            <div v-else>
                <div v-for="el in content.thumbnails" :key="el.id" class="mb-3 mt-2 pointer">
                    <div @click.prevent="switchThumbnail(el)">
                    <img :src="`${$config.BASE_URL}${el.image}`">
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
</template>

<script>
export default {
    layout: 'authWithoutTopbar',
    data () {
        return {
            content: {},
            thumbnail: {},
            loading: false,
            isLoading: false
        }
    },
        async fetch() {
            try {
                this.loading = true
                const { data } = await this.$axios.get(`/content/list_content?content_id=${this.$route.params.id}`)
                this.content = data.data[0]
                this.thumbnail = this.content.thumbnails[0]
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
    }, 
    methods: {
        switchThumbnail(item) {
            this.thumbnail = item
        },
        async handleDelete() {
            try {
                this.isLoading = true
                const response = await this.$axios.delete(`/content/delete_content/${this.$route.params.id}`)
                if (response.status === 204) {
                    this.$toast({
                        type: 'success',
                        text: 'content successfully deleted'
                    })
                    this.$router.push('/publisher/digital-library')
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
        },
        handleEdit() {
            if (this.content.content_type === 'video') {
        this.$router.push({path: './add-video', query: {id: this.content.id}})
      } else if (this.content.content_type === 'document') {
        this.$router.push({path: './add-document', query: {id: this.content.id}})
      } else if (this.content.content_type === 'worksheet') {
        this.$router.push({path: './add-worksheet', query: {id: this.content.id}})
      } else if (this.content.content_type === 'game') {
        this.$router.push({path: './add-game', query: {id: this.content.id}})
      } 
        }
    }
}
</script>

<style scoped>
.subject-container {
    background: #E4EAEE;
}
.icon-abs .iconify {
    font-size: 62px;
    color: #fff;

}
.file-container{
    position: relative;
}
 .file-container img {
    width: 550px;
    height: 323px;
    object-fit: cover;
    border-radius: 1px;
    filter: brightness(70%);
}
.btn-abs {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translateY(-50%);
}
.icon-abs {
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translateY(-50%);
}
.thumbnails-container img {
    width: 90px;
height: 53px;
border-radius: 4px;
object-fit: cover;
}
</style>