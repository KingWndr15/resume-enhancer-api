<template>
    <div class="operator mt-2">
      <h3 class="weight-6">Upload resume</h3>
      <div class="container mt-1">
        <!-- Drop area for uploading files -->
        <div v-if="!fileUploaded && !uploading && !fileProcessed" class="drop-area" @drop="handleDrop" @dragover.prevent>
          <img src="@/assets/images/cloud.svg" alt="">
          <h3 class="mt-1 weight-5">Browse and choose the resume you want to enhance.</h3>
          <p>Should not be more than <span>5mb</span></p>
          <!-- Input element for selecting files -->
          <input type="file" @change="handleFileInput" style="display: none" ref="fileInput">
          <button class="mt-1" @click="$refs.fileInput.click()">Upload +</button>
        </div>
        <!-- Uploaded message -->
        <div v-if="fileUploaded && !uploading && !fileProcessed" class="uploaded">
          <i class="fas fa-check-circle"></i>
          <div class="content">
            <img src="@/assets/images/cloud_done.svg" alt="">
            <h3 class="mt-1 weight-5">File uploaded successfully!</h3>
          </div>
        </div>
        <!-- Uploading message -->
        <div v-if="uploading && !fileProcessed" class="loading">
          <div class="content">
            <!-- Loading animation -->
            <div class="loading-svg"></div>
            <h3 class="mt-1 weight-5">Uploading your resume. Please wait...</h3>
          </div>
        </div>
        <!-- Processed message -->
        <div v-if="fileProcessed" class="processed">
          <div class="content">
            <i class="fas fa-check-circle"></i>
            <img src="@/assets/images/cloud_done.svg" alt="">
            <h3 class="mt-1 weight-5">Your enhanced resume is ready!</h3>
            <button class="mt-1" @click="downloadFile">Download</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileUploaded: false,
        uploading: false,
        fileProcessed: false
      };
    },
    methods: {
      handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        this.uploadFiles(files);
      },
      handleFileInput(event) {
        const files = event.target.files;
        if (files.length > 0 && files[0].size <= 5 * 1024 * 1024) { // Check if file size is less than or equal to 5MB
          this.uploadFiles(files);
        } else {
          alert("File size exceeds the limit of 5MB. Please choose a smaller file.");
        }
      },
      
      uploadFiles(files) {
        // Set uploading to true to show the uploading message
        this.uploading = true;
  
        // Simulate upload delay
        setTimeout(() => {
          // After the upload delay, set uploading to false
          this.uploading = false;
          // Set fileUploaded to true after processing files
          this.fileUploaded = true;
          // Simulate AI processing delay
          setTimeout(() => {
            // Set fileProcessed to true after processing by AI
            this.fileProcessed = true;
          }, 3000); // Adjust the delay time as needed
        }, 3000); // Adjust the delay time as needed
      },
      downloadFile() {
        // Logic to download the enhanced file
        // For demonstration purposes, you can simulate a download action
        alert("Downloading enhanced resume...");
      }
    }
  }
  </script>
  
  <style scoped>
    .operator {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  
    .container {
      width: 100%;
      height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 2px #b2bbc868 dashed;
    }
  
    .container .drop-area {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .container .drop-area h3 {
      font-size: 18px;
    }
  
    .container .drop-area p {
      font-weight: 300;
    }
  
    .container .drop-area p span {
      font-weight: 500 !important;
    }
  
    button {
      background-color: #047857;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      padding: 6px 10px;
      cursor: pointer;
    }
  
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .loading-svg {
      width: 30px;
      height: 30px;
      border: 2px solid transparent;
      border-top-color: #007bff;
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
    }
  
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  
    .processed {
      color: #28a745;
      text-align: center;
    }
  
    .processed i {
      font-size: 2em;
      margin-bottom: 10px;
    }
  </style>
  