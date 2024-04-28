# Resume Enhancement API

## Introduction

The Resume Enhancement API is a powerful tool designed to assist job seekers in creating, previewing, managing, and downloading enhanced resumes. Integrated with Gemini AI, this API leverages advanced natural language processing (NLP) and content enhancement capabilities to provide users with valuable insights and suggestions for optimizing their resumes.

## Features

1. **Create Resume:** Users can upload their resume files to the API for enhancement.

2. **Preview Resume:** After enhancement, users can preview their resumes to see the suggested improvements.

3. **Delete Resume:** Users can delete their uploaded resumes from the system if needed.

4. **Download Resume:** Enhanced resumes can be downloaded in PDF format for easy sharing and printing.

## Base URL

The base URL for accessing the API is:

```
https://resume-enhancer-api.onrender.com
```

## Endpoints

### 1. Upload Resume

- **Endpoint:** `/api/v1/resumes/upload`
- **Method:** POST
- **Summary:** Upload a resume file for enhancement.
- **Request Body:** Multipart form-data with the resume file.
- **Responses:**
  - **201 Created:** Successfully uploaded the resume.
  - **400 Bad Request:** Invalid request or missing parameters.
  - **415 Unsupported Media Type:** Unsupported file format.

### 2. Preview Resume

- **Endpoint:** `/api/v1/resumes/:resumeId`
- **Method:** GET
- **Summary:** Get the enhanced details of a specific resume by its ID.
- **Path Parameter:** `resumeId` - ID of the resume to retrieve.
- **Responses:**
  - **200 OK:** Successfully retrieved the enhanced resume details.
  - **404 Not Found:** Resume with the provided ID not found.

### 3. Delete Resume

- **Endpoint:** `/api/v1/resumes/:resumeId`
- **Method:** DELETE
- **Summary:** Delete a specific resume by its ID.
- **Path Parameter:** `resumeId` - ID of the resume to delete.
- **Responses:**
  - **200 OK:** Successfully deleted the resume.
  - **404 Not Found:** Resume with the provided ID not found.

### 4. Download Resume

- **Endpoint:** `/api/v1/resumes/download/:resumeId`
- **Method:** GET
- **Summary:** Download a specific resume by its ID in PDF format.
- **Path Parameter:** `resumeId` - ID of the resume to download.
- **Responses:**
  - **200 OK:** Successfully downloaded the resume in PDF format.
  - **400 Bad Request:** Invalid request or missing parameters.
  - **404 Not Found:** Resume with the provided ID not found.

## Tags

- **Resume:** Endpoints related to resume management.

## Postman documentation
https://documenter.getpostman.com/view/32396066/2sA3Bt3AAh

## Swagger documentation
https://resume-enhancer-api.onrender.com/api/docs/



