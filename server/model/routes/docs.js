const express = require('express');
const router = express.Router();
const Document = require('../models/Document');


// Create or get a document by id
router.get('/:id', async (req, res) => {
const id = req.params.id;
try {
let doc = await Document.findOne({ docId: id });
if (!doc) {
doc = new Document({ docId: id, content: '' });
await doc.save();
}
return res.json({ docId: doc.docId, content: doc.content, updatedAt: doc.updatedAt });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


// Save content explicitly
router.post('/:id/save', async (req, res) => {
const id = req.params.id;
const { content } = req.body;
try {
const doc = await Document.findOneAndUpdate(
{ docId: id },
{ content, updatedAt: new Date() },
{ new: true, upsert: true }
);
return res.json({ ok: true, doc });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;
