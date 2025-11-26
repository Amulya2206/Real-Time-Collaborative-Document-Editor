import React, { useEffect, useRef, useState } from 'react'


// when someone else makes a change
socket.on('remote-change', ({ fullContent }) => {
// Avoid applying the same content that we already have
if (fullContent !== lastRemote.current) {
setValue(fullContent)
lastRemote.current = fullContent
}
})


socket.on('saved', ({ ok }) => {
if (ok) {
// optional: flash saved indicator
console.log('Document saved')
}
})


return () => {
socket.off('document-content')
socket.off('remote-change')
socket.off('saved')
}
}, [socket, docId])


// Emit local changes as they happen
function handleChange(content, delta, source, editor) {
setValue(content)


// prevent echoing back recently applied remote
if (source === 'user') {
socket?.emit('content-change', {
docId,
delta,
fullContent: content
})


// schedule a save event (or user can press save button)
// We'll rely on server autosave too
}
}


function handleSave() {
socket?.emit('save-document', { docId })
}


return (
<div className="editor-wrap">
<div className="editor-toolbar">
<button onClick={handleSave}>Save</button>
<span className="hint">Realtime: connected to {SOCKET_URL}</span>
</div>
<ReactQuill
ref={quillRef}
theme="snow"
value={value}
onChange={handleChange}
modules={{ toolbar: true }}
style={{ height: '70vh' }}
/>
</div>
)
}
