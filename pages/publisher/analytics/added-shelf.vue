<template>
  <div>
    <Analytics>
        <template #title>
            <div>Added to Shelf</div>
        </template>
        <template #subtitle>
            <div>View the total amount of books added to shelf for this month, you can adjust how data is displaced using the filters belows.</div>
        </template>
        <template #smallcard-title>
            <div>Books Added to Shelf</div>
        </template>
        <template #value>
            {{ added }}
        </template>
    </Analytics>
  </div>
</template>

<script>
export default {
    layout: 'authWithoutTopbar',
    data () {
        return {
            added: ''
        }
    },
    async mounted() {
        await this.getBookshelfStat()
    },
    methods: {
        async getBookshelfStat() {
            try {
                const { data } = await this.$axios.get('/app/publisher/bookshelf_stats')
                this.added = data.data.reduce(
  (a, el) => a + el.number_of_book_shelf_adds,
  0
)
console.log(total)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>