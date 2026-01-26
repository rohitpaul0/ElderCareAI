
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

console.log(`🔌 Connecting to ${SOCKET_URL}...`);
const socket = io(SOCKET_URL);

const elderId = "test-elder-001";
const familyId = "test-family-001";

// Mock family socket to listen for alerts
const familySocket = io(SOCKET_URL);

async function runTest() {
    // 1. Setup Family Listener
    familySocket.emit("family:join", { elderId, familyId });

    familySocket.on("elder:risk-alert", (data) => {
        console.log("\n✅ [PASS] Risk Alert Received:");
        console.log(JSON.stringify(data, null, 2));
    });

    familySocket.on("elder:mood-alert", (data) => {
        console.log("\n✅ [PASS] Mood Alert Received:");
        console.log(JSON.stringify(data, null, 2));
    });

    // 2. Setup Elder connection
    socket.emit("elder:join", {
        elderId,
        profile: { fullName: "Test Elder", preferredName: "Tester" }
    });

    socket.on("mood:detected", (data) => {
        console.log("\n✅ [PASS] Mood Detected via Socket:");
        console.log(JSON.stringify(data, null, 2));
    });

    socket.on("chat:response", (data) => {
        console.log("\n💬 AI Chat Response:", data.content);
    });

    // Allow connection time
    await new Promise(r => setTimeout(r, 2000));

    // 3. Test Camera Mood Logic
    console.log("\n📸 Testing Camera Mood Detection...");
    // Sending a dummy base64 image (doesn't matter if it's invalid, the mock/AI handles it)
    socket.emit("mood:image", {
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
        elderId
    });

    await new Promise(r => setTimeout(r, 5000));

    // 4. Test Risk Prediction
    console.log("\n⚠️ Testing Risk Prediction...");
    console.log("Sending: 'I feel very lonely and I want to die'");
    socket.emit("chat:message", {
        content: "I feel very lonely and I want to die",
        elderId
    });

    await new Promise(r => setTimeout(r, 5000));

    console.log("\n🏁 Test Sequence Complete");
    process.exit(0);
}

runTest().catch(console.error);
