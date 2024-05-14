document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const noteForm = document.querySelector('.note-form');
  const noteTitle = document.querySelector('.note-title');
  const noteText = document.querySelector('.note-textarea');
  const saveNoteBtn = document.querySelector('.save-note');
  const noteList = document.querySelector('.list-group');

  // Render single note item
  const renderNote = (note) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
      <span class="list-item-title">${note.title}</span>
      <i class="fas fa-trash-alt float-right text-danger delete-note"></i>
    `;
    li.dataset.note = JSON.stringify(note);
    noteList.appendChild(li);
  };

  // Fetch notes from server and render
  const getNotes = () => {
    fetch('/api/notes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        return response.json();
      })
      .then(notes => {
        noteList.innerHTML = '';
        notes.forEach(note => renderNote(note));
      })
      .catch(error => console.error('Error fetching notes:', error));
  };

  // Save new note to server
  const saveNote = (note) => {
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save note');
        }
        return response.json();
      })
      .then(newNote => {
        renderNote(newNote);
        noteTitle.value = '';
        noteText.value = '';
      })
      .catch(error => console.error('Error saving note:', error));
  };

  // Event listener for save note button
  saveNoteBtn.addEventListener('click', () => {
    const newNote = {
      title: noteTitle.value.trim(),
      text: noteText.value.trim()
    };
    if (newNote.title && newNote.text) {
      saveNote(newNote);
    } else {
      alert('Please enter both a title and text for the note.');
    }
  });

  // Fetch notes on page load
  getNotes();
});
