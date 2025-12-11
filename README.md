# 🎧 Speech to Text Transcription System (Mock Azure + Node.js + MongoDB Atlas)

This project is a backend-only interview assignment built using **Node.js**, **Express**, and **MongoDB Atlas**.  
The requirement was to implement an API that:

1. Accepts an **audio file URL**  
2. (Mock) Calls the **Azure Speech-to-Text API**  
3. Returns the **transcribed text**  
4. Stores the result and metadata in **MongoDB Atlas**  
5. Implements a **retry mechanism** with exponential backoff  
6. Allows testing via **Postman (no frontend)**  

This project fulfills all assignment requirements using **mocked Azure STT** because credentials are not provided (as allowed in the task).

---

# 🚀 Features

✔ Upload audio URL → Mock Transcription → Save to DB  
✔ Retry with exponential backoff (500ms → 1000ms → 2000ms)  
✔ Proper folder structure (Controller, Service, Routes, Utils)  
✔ Dummy Azure credentials supported  
✔ Postman-friendly API endpoints  
✔ MongoDB Atlas integration  
✔ Clean error handling  
✔ Fully documented setup  
✔ No frontend required  

---

#  Folder Structure

root/
│── controllers/
│ └── azure.controller.js
│
│── services/
│ └── azure.service.js
│
│── routes/
│ └── azure.routes.js
│
│── models/
│ └── transcription.model.js
│
│── utils/
│ ├── retry.js
│ └── download.js
│
│── config/
│ └── db.js
│
│── app.js
│── server.js
│── .env
│── package.json
│── README.md

---

# 🔐 Environment Variables (.env)

Use **dummy credentials** (as allowed by assignment):

PORT=4000
MONGO_URI=your_mongodb_atlas_url_here

AZURE_API_KEY=dummykey123
AZURE_REGION=eastus
AZURE_TIMEOUT=8000


---

#  API Endpoint (Postman Ready)

## **POST /api/azure-transcription**

###  Body (JSON)

```json
{
  "audioUrl": "https://example.com/sample.mp3",
  "language": "en-US"
}
___________________________________________________________________
API Response (Success)

{
  "success": true,
  "message": "Transcription completed",
  "data": {
    "transcription": "This is mocked Azure transcription text.",
    "language": "en-US"
  }
}
___________________________________________________________________
API Response (Error)
{
  "success": false,
  "message": "Unable to transcribe audio after retries"
}
___________________________________________________________________

Retry Logic (Exponential Backoff):-

The retry mechanism automatically retries the Azure API call:

Attempt	Backoff Delay
1st	500ms
2nd	1000ms
3rd	2000ms

If all retries fail → graceful error response.
___________________________________________________________________

MongoDB Document Structure:-

{
  "audioUrl": "https://example.com/sample.mp3",
  "transcription": "Mocked text here",
  "language": "en-US",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
____________________________________________________________________
Running the Project:-
1. Install dependencies:
npm install

2. Start server
Development (auto refresh):-
npm run dev

Production:
npm start

3. Test in Postman

Use:
POST http://localhost:4000/api/azure-transcription
___________________________________________________________________________

Mock Azure Explanation

Because the task says:

"Use Azure STT OR mock if credentials unavailable"

We use dummy Azure credentials and simulate:

API call

Timeout

Retry handler

Transcription text

This satisfies all assignment requirements without real Azure usage.
___________________________________________________________________________

System Flow 

1.User sends audio URL

2.Controller → Service

3.Service calls mock Azure function

4.Retry logic runs on failure

5.Mock transcription created

6.Result stored in MongoDB

7.Response sent back to Postman
______________________________________________________________________
Future Improvements

1.Real Azure STT integration

2.Speech language auto-detection

3.Upload file instead of URL

4.Queue-based processing (RabbitMQ / BullMQ)

5.Swagger API docs

6.Role-based auth
_____________________________________________________________________
Author

Ankush Rathore
Node.js Backend Developer — 1 Year Experience
MongoDB | Express | REST APIs

__________________________________________________________________________
___________________________________________________________________________
* Assumptions Made (Add This to README.md):-

## 🧩 Assumptions Made

Since the assignment did not specify a few details, the following assumptions were made:

1. Azure Speech-to-Text credentials are not provided, so **dummy Azure credentials** are used as allowed in the task.
2. The audio input will be provided as a **public URL**, not a file upload.
3. Default transcription language assumed as **"en-US"** unless specified by the client.
4. Azure STT integration is **mocked**, but the structure is kept ready for real SDK usage.
5. Retry mechanism is limited to **3 attempts**, as this is standard for network-failure retry systems.
6. Postman will be used for testing, so no frontend is implemented.
7. MongoDB Atlas will be used instead of local Compass to ensure cloud accessibility.
___________________________________________________________________________________________
* How You’d Improve It for Production:-

## 🚀 How I Would Improve This System for Production

If this project goes into real production, the following enhancements will be added:

### 🔹 1. Real Azure Speech-to-Text Integration
Replace mock logic with:
- Azure Cognitive Services SDK
- Streaming transcription support
- Multi-language auto-detection

### 🔹 2. File Upload Support
Currently URL-based. Production would support:
- Direct file upload
- S3/GCS storage integration

### 🔹 3. Background Processing
Long audio transcriptions should run asynchronously using:
- BullMQ / Redis
- AWS SQS
- Worker queues

### 🔹 4. Authentication & Authorization
Add:
- JWT authentication
- API rate limiting
- Role-based access

### 🔹 5. Better Error Tracking
Integrate monitoring tools:
- Sentry
- Azure Monitor
- Elastic APM

### 🔹 6. Production Logging
Use winston/pino for logs instead of console.log
_________________________________________________________________
* MongoDB Indexing Notes:-

## 🗄 MongoDB Indexing Notes

For faster reads and scalable query performance, the following indexes are recommended:

### ✔ 1. Index on `createdAt`
Useful for sorting transcripts by date.

```js
transcriptionSchema.index({ createdAt: -1 });
______________
Why indexing matters?

Makes queries 10–20x faster

Saves CPU load

Improves scaling for millions of documents
_________________________________________________
*Scalability Notes:-


This system is designed in a way that allows easy scaling in the future.

### 🔹 1. Horizontal Scaling (Multiple Node.js Instances)
Using a load balancer, we can run:
- Multiple express servers  
- Auto-scale based on CPU usage  

### 🔹 2. Queue Processing (Large Audios)
Move transcription to queues so the API returns instantly.

### 🔹 3. Caching Layer (Redis)
Cache repeated audio URLs to avoid reprocessing.

### 🔹 4. Microservices Architecture
Split into small independent services:
- Upload service
- Transcription service
- History & analytics service

### 🔹 5. MongoDB Sharding
If transcription data becomes very large:
- Enable sharding
- Distribute data across nodes

### 🔹 6. Circuit Breaker Pattern
To avoid retry storms if Azure service is down.

### 🔹 7. API Rate Limiting
Prevent abuse using:
- express-rate-limit  
- Cloudflare rules  
___________________________________________________
