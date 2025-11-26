require('dotenv').config();
// Load from DB or cache
let doc = rooms.get(docId);
if (!doc) {
const dbDoc = await Document.findOne({ docId });
const content = dbDoc ? dbDoc.content : '';
rooms.set(docId, content);
doc = content;
}


// send current content to the joining client
socket.emit('document-content', { content: doc });
});


// Receiving delta/content updates from client
socket.on('content-change', ({ docId, delta, fullContent }) => {
// broadcast this change to other clients in room
socket.to(docId).emit('remote-change', { delta, fullContent });


// Update in-memory cache
rooms.set(docId, fullContent);
});


// Save request — persist to DB
socket.on('save-document', async ({ docId }) => {
try {
const content = rooms.get(docId) ?? '';
await Document.findOneAndUpdate(
{ docId },
{ content, updatedAt: new Date() },
{ upsert: true }
);
socket.emit('saved', { ok: true });
} catch (err) {
console.error('Save error', err);
socket.emit('saved', { ok: false });
}
});


socket.on('disconnect', () => {
console.log('socket disconnected:', socket.id);
});
});


// Periodic autosave (persist cached rooms to DB every X seconds)
const AUTOSAVE_INTERVAL = 20000; // 20s
setInterval(async () => {
for (const [docId, content] of rooms.entries()) {
try {
await Document.findOneAndUpdate(
{ docId },
{ content, updatedAt: new Date() },
{ upsert: true }
);
} catch (err) {
console.error('Autosave failed for', docId, err);
}
}
}, AUTOSAVE_INTERVAL);


// Connect to MongoDB and start server
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/realtime_collab';


mongoose
.connect(MONGO_URI, { dbName: 'realtime_collab' })
.then(() => {
console.log('Mongo connected');
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
console.error('Mongo connection error', err);
});
