<template>
  <div>
  <AddContent :upload="true" :disableSnippet="true" @file-upload="handleUpload" @remove-file="removeFile" :valid-file="validFile" @content-data="handleSubmit" :loading="loading">
        <template #title> Add Exercise </template>
        <template #upload-title>Upload Exercise</template>
      <template #upload-label>exercise</template>
      <template #thumbnail-label>exercise</template>
      <template #exercise-upload>
        <!-- <small class="text-grey fs-12 font-weight-600">Upload Exercise</small> -->
                  <!-- <div class=""> -->
                    <!-- <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <span
                        class="iconify text-grey upload-icon"
                        data-icon="ic:sharp-upload"
                      ></span>
                    </div>
                    <div
                      class="d-flex align-items-center justify-content-center fs-12 mt-1"
                    > -->
                    <!-- <span
                          class="text-blue pointer text-decoration-underline"
                          @click="$refs.fileInput.click()"
                          > -->
                          <div class="mt-3 line-height-0 text-blue fs-14 pointer" @click="$refs.fileInput.click()">
                          <!-- <span
                            class="iconify fs-18"
                            data-icon="fluent:add-24-filled"
                            style="font-size: 18px; color: #1070b7"
                          ></span> -->
                          <strong>
                          Upload Exercise Sheet</strong>
                        </div>
                      <input
                        ref="fileInput"
                        type="file"
                        class="d-none"
                        @change.prevent="handleUpload()"
                        multiple
                      />
                    <!-- </div>
                  </div> -->
      </template>
      <template #exercise>
        <div v-if="sections.length === 0" class="text-primary pointer d-flex align-content-center">
                        <div class="mr-1 line-height-0">
                          <span
                            class="iconify fs-18"
                            data-icon="fluent:add-24-filled"
                            style="font-size: 18px; color: #1070b7"
                          ></span>
                        </div>
                        <strong class="fs-14" @click="addSection">Add Section</strong>
                      </div>
                <div v-if="sections.length > 0" class="col-12">
                  <hr />
  
                  <div class="card-title mb-3 fs-20 font-weight-normal">Sections</div>
                </div>
                <div class="col-12">
                  <div class="exc-sections-wrapper">
                    <div class="exc-sections-wrapper">
                      <div
                        v-for="(section, index) in sections"
                        :key="index"
                        class="exc-section mb-2"
                      >
                        <div
                          class="bg-primary rounded accordion-header active target-icon creation-accordion-header px-3 py-3"
                        >
                          <div class="d-flex align-items-center">
                            <div class="mr-3 line-height-0">
                              <svg
                                class="toggle-icon"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0Z"
                                  fill="#D6DAEB"
                                />
                                <path
                                  d="M15 9.5L11 13.5L7 9.5"
                                  stroke="#484848"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <div class="title-text text-white mr-2">
                              Section {{ index + 1 }} -
                              <template v-if="section.editSectionHeader">
                                {{ section.title ? section.title : "" }}
                                <span @click="changeHeader(index)">
                                  <span
                                    class="iconify text-white pointer fs-18"
                                    data-icon="eva:edit-2-outline"
                                  ></span>
                                </span>
                              </template>
  
                              <template v-else>
                                <input
                                  v-model="section.title"
                                  @keyup.enter="changeHeader(index)"
                                />
                                <div
                                  :style="{ display: 'inline' }"
                                  @click="changeHeader(index)"
                                >
                                  <span
                                    class="iconify text-white"
                                    data-icon="teenyicons:tick-outline"
                                  ></span>
                                </div>
                              </template>
                            </div>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="line-height-0 mr-3" @click="deleteSection(index)">
                              <span
                                class="iconify text-danger pointer fs-28 ml-3"
                                data-icon="uil:trash-alt"
                              ></span>
                            </div>
                            <div class="pointer d-flex align-items-center">
                              <span
                                class="iconify"
                                data-icon="fluent:re-order-dots-vertical-16-filled"
                                data-width="24"
                                data-height="24"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-content show px-4 px-md-5 mb-5">
                          <div class="row mt-3">
                            <div class="col-lg-12">
                              <div class="mb-2">
                                <label class="form-control-label"
                                  >Header/Section Instruction</label
                                >
                                <client-only>
                                  <ckeditor-comp
                                    v-model="section.header"
                                    :config="editorConfigForSection"
                                    placeholder="Add Header / Description / Instruction"
                                  />
                                </client-only>
                                <!-- <textarea
                                    v-model="section.header"
                                    class="form-control form-control-sm"
                                    placeholder="Add Header / Description / Instruction"
                                  ></textarea> -->
                                <!-- <VueEditor
                              v-model="section.header"
                              placeholder="Add Header / Description / Instruction"
                            /> -->
                              </div>
                            </div>
                          </div>
                          <hr />
  
                          <!-- Questions Start Here  -->
                          <label class="form-control-label fs-14 mb-2"
                            >Section Questions</label
                          >
                          <div
                            v-for="(question, value) in section.questions"
                            :key="value"
                            class="exc-section-question mb-2"
                          >
                            <div
                              class="bg-primary rounded accordion-header target-icon creation-accordion-header active px-3 py-3"
                            >
                              <div class="d-flex align-items-center">
                                <div class="mr-3 line-height-0">
                                  <svg
                                    class="toggle-icon"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0Z"
                                      fill="#D6DAEB"
                                    />
                                    <path
                                      d="M15 9.5L11 13.5L7 9.5"
                                      stroke="#484848"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div
                                  class="bg-grayish-variant-1 fs-14 text-dark py-1 px-2 font-weight-bold rounded mr-2"
                                >
                                  {{ `Question ${value + 1}` }}
                                </div>
                              </div>
                              <div class="d-flex align-items-center">
                                <div
                                  class="line-height-0 mr-3"
                                  @click="removeSectionQuestion(index, value)"
                                >
                                  <span
                                    class="iconify text-danger pointer fs-24 ml-3"
                                    data-icon="uil:trash-alt"
                                  ></span>
                                </div>
                                <div class="pointer d-flex align-items-center">
                                  <span
                                    class="iconify"
                                    data-icon="fluent:re-order-dots-vertical-16-filled"
                                    data-width="24"
                                    data-height="24"
                                  ></span>
                                </div>
                              </div>
                            </div>
                            <div
                              v-if="question.question_type === 'options'"
                              class="accordion-content show px-2"
                            >
                              <div class="row mt-3">
                                <div class="col-lg-12 order-last order-xl-first">
                                  <div class="mb-3">
                                    <label class="form-control-label"
                                    >Question</label
                                  >
                                    <client-only>
                                      <ckeditor-comp
                                        v-model="question.text"
                                        :config="editorConfigForQuestion"
                                        placeholder="Enter Question"
                                      />
                                    </client-only>
                                    <!-- <textarea
                                    v-model="question.text"
                                    class="form-control form-control-sm"
                                    placeholder="Enter Question"
                                  ></textarea> -->
                                  </div>
                                  <div class="mb-3">
                                    <label class="form-control-label"
                                      >Question Score</label
                                    >
                                    <input
                                      v-model="question.marks"
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter Score"
                                      style="max-width: 220px"
                                      @input="changeObtainableScore($event.target.value)"
                                    />
                                  </div>
                                </div>
                                <!-- <div
                                class="col-xl-2 mb-3 mb-lg-0"
                                :style="{ cursor: 'pointer' }"
                                @click="uploadQuestionImage(index, value)"
                              >
                                <div
                                  class="
                                    file-type-display
                                    py-3
                                    px-3
                                    text-center
                                    w-100
                                  "
                                  style="max-width: 241px"
                                >
                                  <div class="mb-2">
                                    <span
                                      class="iconify mr-2"
                                      data-icon="bi:file-image"
                                      style="font-size: 31px"
                                    ></span>
                                  </div>
                                  <div class="text-primary fs-10">
                                    {{
                                      question.file_upload.name
                                        ? question.file_upload.name
                                        : 'Click to upload an Image(optional)'
                                    }}
                                    <input
                                      id="questionImage"
                                      ref="fileInput"
                                      class="invisible"
                                      type="file"
                                      accept="image/*"
                                      name="imagesArray"
                                      @change="onChange"
                                    />
                                  </div>
                                </div>
                              </div> -->
                              </div>
  
                              <div class="">
                                <div class="mb-2">
                                  <label class="form-control-label">Options</label>
                                  <div class="fs-12 font-weight-bold text-dark">
                                    Highlight correct answer
                                  </div>
                                </div>
                                <div
                                  v-for="(
                                    option, optionIndex
                                  ) in question.question_option"
                                  :key="optionIndex"
                                  class="row align-items-center mb-2"
                                >
                                  <div
                                    class="text-primary cursorpointer"
                                    @click="option.textOnly = !option.textOnly"
                                  >
                                    <span v-if="option.textOnly">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="28"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                      >
                                        <rect
                                          x="0"
                                          y="0"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          stroke="none"
                                        />
                                        <path
                                          fill="currentColor"
                                          d="M21.25 7.5a.75.75 0 0 1 .743.648L22 8.25v8.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20H6.061l.72.72a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073l-2-2l-.064-.072a1.213 1.213 0 0 1-.007-.01l.07.082a.753.753 0 0 1-.127-.89a.775.775 0 0 1 .128-.17l2-2a.75.75 0 0 1 1.133.976l-.073.084l-.72.72h12.69a1.75 1.75 0 0 0 1.744-1.607l.006-.143v-8.5a.75.75 0 0 1 .75-.75Zm-3.054-5.353l.084.073l2 2a.75.75 0 0 1 .071.081l-.07-.081a.752.752 0 0 1 .004 1.056l-.005.004l-2 2a.75.75 0 0 1-1.133-.976l.073-.084l.718-.72H5.25a1.75 1.75 0 0 0-1.744 1.606L3.5 7.25v8.5a.75.75 0 0 1-1.493.102L2 15.75v-8.5a3.25 3.25 0 0 1 3.066-3.245L5.25 4h12.689l-.72-.72a.75.75 0 0 1-.072-.976l.073-.084a.75.75 0 0 1 .976-.073ZM12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8Z"
                                        />
                                      </svg>
                                    </span>
                                    <span v-else>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="28"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                      >
                                        <rect
                                          x="0"
                                          y="0"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          stroke="none"
                                        />
                                        <path
                                          fill="currentColor"
                                          d="M21.25 7.5a.75.75 0 0 1 .743.648L22 8.25v8.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20H6.061l.72.72a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073l-2-2l-.064-.072a1.213 1.213 0 0 1-.007-.01l.07.082a.753.753 0 0 1-.127-.89a.775.775 0 0 1 .128-.17l2-2a.75.75 0 0 1 1.133.976l-.073.084l-.72.72h12.69a1.75 1.75 0 0 0 1.744-1.607l.006-.143v-8.5a.75.75 0 0 1 .75-.75Zm-3.054-5.353l.084.073l2 2a.75.75 0 0 1 .071.081l-.07-.081a.752.752 0 0 1 .004 1.056l-.005.004l-2 2a.75.75 0 0 1-1.133-.976l.073-.084l.718-.72H5.25a1.75 1.75 0 0 0-1.744 1.606L3.5 7.25v8.5a.75.75 0 0 1-1.493.102L2 15.75v-8.5a3.25 3.25 0 0 1 3.066-3.245L5.25 4h12.689l-.72-.72a.75.75 0 0 1-.072-.976l.073-.084a.75.75 0 0 1 .976-.073ZM12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8Zm0 1.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Z"
                                        />
                                      </svg>
                                    </span>
                                  </div>
  
                                  <div class="col-md-10 col-11">
                                    <div
                                      class="d-flex align-items-center p-1 h-auto"
                                      :class="{ 'form-control': !option.textOnly }"
                                    >
                                      <div
                                        v-if="!option.textOnly"
                                        class="flex-grow-1 mr-2"
                                      >
                                        <input
                                          v-model="option.option"
                                          type="text"
                                          :placeholder="`Option ${optionIndex + 1}`"
                                          class="form-control bg-white h-100 px-0 border-0 py-2 fs-14"
                                          style="box-shadow: none"
                                        />
                                      </div>
                                      <div v-else class="col-12 p-1">
                                        <client-only>
                                          <ckeditor-comp
                                            v-model="option.option"
                                            :config="editorConfigForOption"
                                            placeholder="Add option"
                                          />
                                        </client-only>
                                      </div>
                                      <div>
                                        <label class="custom-checkbox">
                                          <input
                                            v-model="option.correct_flag"
                                            type="checkbox"
                                          />
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="line-height-0 mr-3"
                                    @click="removeOption(index, value, optionIndex)"
                                  >
                                    <span
                                      class="iconify text-danger pointer fs-18"
                                      data-icon="uil:trash-alt"
                                    ></span>
                                  </div>
                                </div>
  
                                <div class="row align-items-center mb-2">
                                  <div class="col-md-10 col-11">
                                    <div
                                      class="d-flex align-content-center justify-content-end"
                                    >
                                      <div
                                        class="text-primary pointer d-flex align-content-center"
                                      >
                                        <div class="mr-1 line-height-0">
                                          <span
                                            class="iconify fs-18"
                                            data-icon="fluent:add-24-filled"
                                            style="font-size: 18px; color: #1070b7"
                                          ></span>
                                        </div>
                                        <strong
                                          class="fs-14"
                                          @click="addOption(index, value)"
                                          >Add Option</strong
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="row align-items-center mb-2">
                                  <div class="col-md-12">
                                    <div class="mb-3">
                                      <label class="form-control-label"
                                        >Marking Guide</label
                                      >
                                      <client-only>
                                        <ckeditor-comp
                                          v-model="question.hint"
                                          :config="editorConfigForMarking"
                                        />
                                      </client-only>
                                      <!-- <textarea
                                      v-model="question.hint"
                                      class="form-control"
                                      placeholder="Add marking guide"
                                    ></textarea> -->
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              v-else-if="question.question_type === 'trueFalse'"
                              class="accordion-content show px-2"
                            >
                              <div class="row mt-3">
                                <div class="col-lg-12 order-last order-xl-first">
                                  <div class="mb-3">
                                    <label class="form-control-label">Question</label>
                                    <client-only>
                                      <ckeditor-comp
                                        v-model="question.text"
                                        :config="editorConfigForQuestion"
                                        placeholder="Enter Question"
                                      />
                                    </client-only>
                                    <!-- <textarea
                                    v-model="question.text"
                                    class="form-control form-control-sm"
                                    placeholder="Enter Question"
                                  ></textarea> -->
                                  </div>
                                  <div class="mb-3">
                                    <label class="form-control-label"
                                      >Question Score</label
                                    >
                                    <input
                                      v-model="question.marks"
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter Score"
                                      style="max-width: 220px"
                                      @input="changeObtainableScore($event.target.value)"
                                    />
                                  </div>
                                </div>
                                <!-- <div
                                class="col-xl-2 mb-3 mb-lg-0"
                                :style="{ cursor: 'pointer' }"
                                @click="uploadQuestionImage(index, value)"
                              >
                                <div
                                  class="file-type-display py-3 px-3 text-center w-100"
                                  style="max-width: 241px"
                                >
                                  <div class="mb-2">
                                    <span
                                      class="iconify mr-2"
                                      data-icon="bi:file-image"
                                      style="font-size: 31px"
                                    ></span>
                                  </div>
                                  <div class="text-primary fs-10">
                                    {{
                                      question.file_upload.name
                                        ? question.file_upload.name
                                        : "Click to upload an Image(optional) "
                                    }}
                                  </div>
                                </div>
                              </div> -->
                              </div>
  
                              <div class="">
                                <div class="mb-2">
                                  <label class="form-control-label">Options</label>
                                  <div class="fs-12 font-weight-bold text-dark">
                                    Highlight correct answer true or false
                                  </div>
                                </div>
  
                                <div
                                  v-for="(
                                    option, optionIndex
                                  ) in question.question_option"
                                  :key="optionIndex"
                                  class="row align-items-center mb-2"
                                >
                                  <div class="col-md-10 col-11">
                                    <div
                                      class="d-flex align-items-center form-control py-0 h-auto"
                                    >
                                      <div class="flex-grow-1 mr-2">
                                        <input
                                          v-model="option.option"
                                          type="text"
                                          disabled
                                          :placeholder="
                                            optionIndex === 0 ? 'True' : 'False'
                                          "
                                          class="form-control bg-white h-100 px-0 border-0 py-2 fs-14 text-capitalize"
                                          style="box-shadow: none"
                                        />
                                      </div>
                                      <div>
                                        <label class="custom-checkbox">
                                          <input
                                            :id="'age1' + Math.random()"
                                            v-model="
                                              question.question_option[0].correct_flag
                                            "
                                            type="radio"
                                            :value="option.option"
                                            :name="'TrueFalse' + Math.random()"
                                          />
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
  
                                <div class="row align-items-center mb-2">
                                  <div class="col-md-12">
                                    <div class="mb-3">
                                      <label class="form-control-label"
                                        >Marking Guide</label
                                      >
                                      <!-- <textarea
                                      v-model="question.hint"
                                      class="form-control"
                                      placeholder="Add marking guide"
                                    ></textarea> -->
                                      <client-only>
                                        <ckeditor-comp
                                          v-model="question.hint"
                                          :config="editorConfigForMarking"
                                        />
                                      </client-only>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              v-else-if="question.question_type === 'freeText'"
                              class="accordion-content show px-2"
                            >
                              <div class="row mt-3">
                                <div class="col-lg-12 order-last order-xl-first">
                                  <div class="mb-3">
                                    <label class="form-control-label"
                                    >Question</label
                                  >
                                    <client-only>
                                      <ckeditor-comp
                                        v-model="question.text"
                                        :config="editorConfigForQuestion"
                                        placeholder="Enter Question"
                                      />
                                    </client-only>
                                    <!-- <textarea
                                    v-model="question.text"
                                    class="form-control form-control-sm"
                                    placeholder="Enter Question"
                                  ></textarea> -->
                                  </div>
                                  <div class="mb-3">
                                    <label class="form-control-label"
                                      >Question Score</label
                                    >
                                    <input
                                      v-model="question.marks"
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter Score"
                                      style="max-width: 220px"
                                      @input="changeObtainableScore($event.target.value)"
                                    />
                                  </div>
                                </div>
                                <!-- <div
                                class="col-xl-2 mb-3 mb-lg-0"
                                :style="{ cursor: 'pointer' }"
                                @click="uploadQuestionImage(index, value)"
                              >
                                <div
                                  class="
                                    file-type-display
                                    py-3
                                    px-3
                                    text-center
                                    w-100
                                  "
                                  style="max-width: 241px"
                                >
                                  <div class="mb-2">
                                    <span
                                      class="iconify mr-2"
                                      data-icon="bi:file-image"
                                      style="font-size: 31px"
                                    ></span>
                                  </div>
                                  <div class="text-primary fs-10">
                                    {{
                                      question.file_upload.name
                                        ? question.file_upload.name
                                        : 'Click to upload an Image(optional) offline'
                                    }}
                                  </div>
                                </div>
                              </div> -->
                              </div>
  
                              <div class="row align-items-center mb-2">
                                <div class="col-md-12">
                                  <div class="mb-3">
                                    <label class="form-control-label"
                                      >Marking Guide
                                    </label>
                                    <client-only>
                                      <ckeditor-comp
                                        v-model="question.hint"
                                        :config="editorConfigForMarking"
                                      />
                                    </client-only>
                                    <!-- <textarea
                                    v-model="question.hint"
                                    class="form-control"
                                    placeholder="Add marking guide"
                                  ></textarea> -->
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <!-- Questions End Here  -->
                        <hr />
                        <div class="d-flex align-content-center justify-content-end">
                          <div class="text-primary pointer d-flex align-content-center">
                            <b-dropdown
                              v-model="section_question"
                              text="Add Questions"
                              variant="primary"
                              class="m-2"
                            >
                              <b-dropdown-item @click="addQuestion(index, 'options')"
                                >Multichoice</b-dropdown-item
                              >
                              <b-dropdown-item @click="addQuestion(index, 'trueFalse')"
                                >True or False</b-dropdown-item
                              >
                              <b-dropdown-item @click="addQuestion(index, 'freeText')"
                                >Free Text</b-dropdown-item
                              >
                            </b-dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="sections.length > 0" class="col-12">
                  <hr />
                  <div>
                    <div class="d-flex align-items-center justify-content-end">
                      <div class="text-primary pointer d-flex align-content-center">
                        <!-- <strong class="fs-14">Import Previous Sections</strong> -->
                      </div>
                      <div class="text-primary pointer d-flex align-content-center ml-4">
                        <div class="mr-1 line-height-0">
                          <span
                            class="iconify fs-18"
                            data-icon="fluent:add-24-filled"
                            style="font-size: 18px; color: #1070b7"
                          ></span>
                        </div>
                        <strong class="fs-14" @click="addSection">Add Section</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
      </AddContent>
      </div>
</template>

<script>
import assignmentGalleryAddition from "~/mixins/assignmentGalleryAddition";
export default {
  layout: 'authWithoutTopbar',
  mixins: [assignmentGalleryAddition],
}
</script>

<style scoped>
.upload-icon {
  font-size: 70px;
}
.file-area {
  height: 140px;
  width: 250px;
  background: #f7fafa;
  border: 1px dashed #d4d7e4;
  border-radius: 5px;
  position: relative;
}
.uploaded-area {
  width: 250px;
}
</style>