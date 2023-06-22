export default {
  data() {
    return {
      showSectionsEdit:false,
      author: null,
      submitForm: false,
      loading: false,
      editorConfig: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: "Provide brief description for students for this assignment",
        removePlugins: ["Title"],
      },
      editorConfigForQuestion: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: "Enter Question",
        removePlugins: ["Title"],
      },
      editorConfigForSection: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: "Add Header / Description / Instruction",
        removePlugins: ["Title"],
      },
      editorConfigForOption: {
        title: {
          // placeholder: 'h1',
        },
        placeholder: "Add option",
        removePlugins: ["Title"],
      },
      allSubjects: [],
      essayAttachment: {},
      essayResponse: {},
      essaySpinner: false,
      datePicker1: false,
      datePicker2: false,
      showDates: true,
      showDuration: true,
      questionImage: { section: 0, question: 0 },
      imagesArray: '',
      gradeList: [],
      section_question: '',
      exercise_name: '',
      exercise_description: '',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      classes: '',
      exercise_type: '',
      exercise_format: 'assessment',
      available_date: '',
      due_date: '',
      duration: '',
      full_score: '',
      essay: {
        essay_description_item: '',
      },

      sections: [],
      subject: '',
      subjects: [],
      grade_level: '',
      grade_levels: ["PreSchool", "Primary 1", "Primary 2", 'JSS 1', 'JSS 2'],
      file: '',
      description: '',
      title: '',
      subjectList: [],
      curriculumList: []
    }
  },
  // async fetch() {
  //   try {
  //     this.loading = true

  //     const slate_school_id = await this.$store.state.administration.school.id

  //     const allGrades = await this.$axios.get(
  //       `/slate-admin/school/${slate_school_id}/grades/?paginate=false`
  //     )
  //     const allSubjects = await this.$axios.get(
  //       `schools/v2/lms/${this.$store.state.school.currentAcademicYear.id}/subjects/?paginate=false`
  //     )

  //     this.allSubjects = allSubjects.data.data

  //     this.loading = false

  //     this.gradeList = allGrades.data.data
  //   } catch (e) {
  //     console.error(e)
  //   } finally {
  //     this.loading = false
  //   }
  // },
  computed: {
    disableObtainableScore() {
      if (this.exercise_type === 'objective') {
        // full_score
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return true
      } else {
        return false
      }
    },
    routeClassName() {
      if (this.$route.query.subjectId) {
        return this.$route.query.className
      } else {
        return 'NaN'
      }
    },
    routeSubjectName() {
      if (this.$route.query.subjectId) {
        return this.$route.query.subjectName
      } else {
        return 'NaN'
      }
    },
  },

  async mounted() {
    $(document).on(
      'click',
      '.accordion-header:not(.creation-accordion-header)',
      (e) => {
        $(e.currentTarget.nextElementSibling).toggleClass('show')
        $(e.currentTarget).toggleClass('active')
      }
    )

    $(document).on('click', '.creation-accordion-header', (e) => {
      $(
        e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling
      ).toggleClass('show')
      $(e.target.parentNode.parentNode.parentNode.parentNode).toggleClass(
        'active'
      )
    })

    // const school = this.$store.getters["school/getSchoolByCode"](this.$route.params.id);

    // this.editorConfig.simpleUpload.uploadUrl = `${process.env.BASE_URL}/schools/v2/school/${school.id}/wiziwick_resource/`;
    // this.editorConfig.simpleUpload.headers = {
    //   Authorization: `Bearer ${this.$cookies.get('publisher-token')}`,
    //   "Access-Control-Allow-Origin": "*",
    // };
    // this.editorConfig.simpleUpload.withCredentials = false;

    // // this.editorConfigForQuestion.simpleUpload.uploadUrl = `${process.env.BASE_URL}/schools/v2/school/${school.id}/wiziwick_resource/`;
    // this.editorConfigForQuestion.simpleUpload.headers = {
    //   Authorization: `Bearer ${this.$cookies.get('publisher-token')}`,
    //   "Access-Control-Allow-Origin": "*",
    // };
    // this.editorConfigForQuestion.simpleUpload.withCredentials = false;

    // // this.editorConfigForSection.simpleUpload.uploadUrl = `${process.env.BASE_URL}/schools/v2/school/${school.id}/wiziwick_resource/`;
    // this.editorConfigForSection.simpleUpload.headers = {
    //   Authorization: `Bearer ${this.$cookies.get('publisher-token')}`,
    // };
    // this.editorConfigForSection.simpleUpload.withCredentials = false;

    // // this.editorConfigForOption.simpleUpload.uploadUrl = `${process.env.BASE_URL}/schools/v2/school/${school.id}/wiziwick_resource/`;
    // this.editorConfigForOption.simpleUpload.headers = {
    //   Authorization: `Bearer ${this.$cookies.get('publisher-token')}`,
    //   "Access-Control-Allow-Origin": "*",
    // };
    // this.editorConfigForOption.simpleUpload.withCredentials = false;
  },
  watch:{
    sections(){
      setTimeout(()=>{
        this.showSectionsEdit = true

      },4000)

    },
    subject: {
      async handler() {
        await this.getSubjects();
      },
      immediate: true,
    },
    },
  methods: {
    changeObtainableScore() {
      const allScore = []
      let totalObtainableScore = 0
      this.sections.forEach((section) => {
        section.questions.forEach((question) =>
          allScore.push(Number(question.marks))
        )
      })
      const numbersLength = allScore.length
      for (let i = 0; i < numbersLength; i++) {
        totalObtainableScore += allScore[i]
      }
      this.full_score = totalObtainableScore
    },
    async deleteUpload() {
      const schoolId = await this.$store.state.administration.school.id
      try {
        await this.$axios.$delete(
          `/schools/v2/school/${schoolId}/resource/${this.essayResponse.file_id}/`
        )

        this.essayAttachment = {}
      } catch (e) {
        console.log(e)
      }
    },
    async getSubjects() {
      try {
        const { data } = await this.$axios.get("/app/list_subjects");
        this.subjects = data.results;
      } catch (error) {
        console.log(error);
      }
    },
    uploadEssay() {
      if (this.$refs.upload_essay) {
        this.$refs.upload_essay.click()
      }
    },
    showSections() {
      console.log(this.questionImage)
    },
    async handleUpload() {
      const input = this.$refs.fileInput;
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
    
        // Check file type
        if (!file.type.includes('spreadsheetml')) {
          this.$toast({
            type: "error",
            text: `Invalid file format: ${file.name}`,
          });
          continue; // Skip this file and move to the next one
        }
    
        const formData = new FormData();
        formData.append('spread_sheet', file);
    
        try {
          const {data} = await this.$axios.post('/content/upload_quezes_from_sheet/', formData);
          const quiz = data.data;
    
          if (quiz.length > 0) {
            let sectionIndex = this.sections.length;
            await this.addSection();
    
            quiz.forEach((el) => {
              if (el.question_type === 'options') {
                let questionObj = this.questionObject('options');
                questionObj.text = el.question;
                questionObj.hint = el.marking_guide;
                questionObj.question_option = [];
    
                el.answer_options.forEach((item) => {
                  questionObj.question_option.push({
                    option: item.answer_option,
                    correct_flag: item.correct_flag,
                    textOnly: false,
                  });
                });
    
                this.sections[sectionIndex].questions.push(questionObj);
              } else if (el.question_type === 'true/false') {
                let questionObj1 = this.questionObject('trueFalse');
                questionObj1.text = el.question;
                questionObj1.hint = el.marking_guide;
                questionObj1.question_option = [];
    
                el.answer_options.forEach((item) => {
                  questionObj1.question_option.push({
                    option: item.answer_option,
                    correct_flag: item.correct_flag,
                    textOnly: false,
                  });
                });
    
                this.sections[sectionIndex].questions.push(questionObj1);
              } else if (el.question_type === 'free_text') {
                this.sections[sectionIndex].questions.push(this.questionObject('freeText', []));
              }
            });
          }
        } catch (error) {
          console.error(error);
        }
        input.value = ''
      }
    },
    removeFile() {
      this.file = null;
      this.quiz = {}
    },
    truncate(source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    editContent(item) {
      this.sections = item.quiz_config.sections
    },
    async handleSubmit(item) {
        this.submitForm = true
        await this.changeObtainableScore()
        if (this.$route.query.id) {
          item.subject.forEach((el) => {
            this.subjectList.push(el.id)
          })
          item.curriculum.forEach((item) => {
            this.curriculumList.push(item.id)
          })
        }
        const data = {
        content_type: 'quiz',
        title: item.title,
        description: item.description,
        subject: this.$route.query.id ? this.subjectList : item.subject,
        languages: item.languages,
        grade_levels: item.grade_levels,
        // content_file: this.file,
        categories: item.categories,
        keywords: item.keywords,
        curriculum: this.$route.query.id ? this.curriculumList : item.curriculum,
        thumbnails: item.thumbnails,
        // status: item.status,
        quiz_config: {
          // available_date: "",

          description: this.exercise_description,
          // due_date: this.due_date ? `${this.due_date} 0:00:00` : "",
          duration: this.duration ? this.duration : '',
          // essay_item: {},
          full_score: this.full_score,
          // lesson_objective: [],
          name: this.exercise_name,
          quiz_mode: this.exercise_format,
          quiz_type: this.exercise_type,
          sections: this.sections,
        }
      }

        try {
          this.loading = true
          if(this.$route.query.id) {
            const response = await this.$axios.put(`/content/update_content/${this.$route.query.id}/`, data)
            if(response.status === 200) {
              this.$toast({
                type: 'success',
                text: 'content updated successfully'
              })
              this.$router.push(`/publisher/digital-library/content/${this.$route.query.id}`)
            }
          } else {
          const response = await this.$axios.post('/content/upload_content/', data)
          if(response.status === 200) {
            this.$toast({
                type: 'success',
                text : 'content uploaded successfully'
            })
            this.$router.push(`/publisher/digital-library/content/${response.data.id}`)
          }
          }
        } catch (error) {

          console.log(error)
        } finally {
          this.loading = false
        }
    },
    removeOption(index, value, optionIndex) {
      this.sections[index].questions[value].question_option.splice(
        optionIndex,
        1
      )
    },
    addOption(index, value) {
      if (this.sections[index].questions[value].question_option.length < 5) {
        this.sections[index].questions[value].question_option.push({
          option: '',
          correct_flag: false,
          textOnly: false,

        })
      }
    },
    essayFile(e) {
      this.essayAttachment = ''
      if (e.target.files.length > 0) {
        this.essayAttachment = e.target.files[0]
        this.essaySpinner = true
        this.submitEssayAttachment()
      }
    },
    async submitEssayAttachment() {
      const schoolId = await this.$store.state.administration.school.id
      const formData = new FormData()
      formData.append('file', this.essayAttachment)
      formData.append('type', this.essayAttachment.type)
      try {
        this.submitForm = true

        const {
          data: { data },
        } = await this.$axios.post(
          `schools/v2/school/${schoolId}/resource/`,
          formData
        )
        this.essayResponse = data
      } catch (error) {
        console.log(error)
        this.essayAttachment = {}
      } finally {
        this.$refs.upload_essay.value = null

        this.submitForm = false

        this.essaySpinner = false
      }
    },
    onChange(event) {
      if (event.target.files.length > 0) {
        this.imagesArray = event.target.files[0]
        const imageName = event.target.files[0].name
        this.updateAvatar(imageName)
      }
    },

    uploadQuestionImage(index, value) {
      if (this.$refs.fileInput) {
        document.getElementById('questionImage').click()
        this.questionImage.section = index
        this.questionImage.question = value
      }
    },
    removeSectionQuestion(index, value) {
      this.sections[index].questions.splice(value, 1)
    },
    questionObject(
      type = 'options',
      options = [
        {
          option: '',
          correct_flag: false,
          textOnly: false,

        },
        {
          option: '',
          correct_flag: false,
          textOnly: false,

        },
        {
          option: '',
          correct_flag: false,
          textOnly: false,

        },
      ]
    ) {
      return {
        active: true,
        answer_type: type,
        difficulty: '',
        file_upload: {
          file: {},
          name: '',
          stat: 100,
          status: '',
          type: '',
          url: '',
        },
        hint: '',
        image_url: '',
        marks: 1,
        practice_question: '',
        question_option: options,
        question_type: type,
        test_question: '',
        text: '',
        topic: '',
      }
    },
    addQuestion(index, question_type = 'options') {
      if (question_type === 'options') {
        this.sections[index].questions.push(this.questionObject('options'))
      } else if (question_type === 'trueFalse') {
        this.sections[index].questions.push(
          this.questionObject('trueFalse', [
         
            { option: true, correct_flag: '',
            textOnly: false,
          
          },
            { option: false, correct_flag: '',
            textOnly: false,
          
           },
          ])
        )
      } else if (question_type === 'freeText') {
        this.sections[index].questions.push(this.questionObject('freeText', []))
      }
      setTimeout(() => {
        this.changeObtainableScore()
      }, 1500)
    },
    deleteSection(index) {
      this.sections.splice(index, 1)
    },
    changeHeader(index) {
      this.sections[index].editSectionHeader =
        !this.sections[index].editSectionHeader
    },
    addSection() {
      this.sections.push({
        title: '',
        header: '',
        editSectionHeader: true,
        questions: [],
        options: {},
        true_false: {},
        free_text: {},
      })
    },
  },
}
