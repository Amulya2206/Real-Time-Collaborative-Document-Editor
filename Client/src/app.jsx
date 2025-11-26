import React, { useState } from 'react'
import Editor from './components/Editor'


export default function App() {
const [docId, setDocId] = useState('default-doc')


function handleChangeId(e) {
setDocId(e.target.value)
}


return (
<div className="app-container">
<header>
<h1>Real-time Collaborative Document Editor</h1>
<div className="controls">
<label>
Document ID:
<input value={docId} onChange={handleChangeId} />
</label>
</div>
</header>
<main>
<Editor docId={docId} />
</main>
</div>
)
}
