import { useState, useEffect } from "react"
import { MdAdd, MdDelete, MdEdit, MdClose } from "react-icons/md"
import { FaStickyNote } from "react-icons/fa"

export default function NotesManager() {
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [newNote, setNewNote] = useState({ title: "", content: "", color: "emerald" });

    const colors = [
        { name: 'emerald', class: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30' },
        { name: 'blue', class: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
        { name: 'purple', class: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
        { name: 'orange', class: 'from-orange-500/20 to-red-500/20 border-orange-500/30' },
    ];

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('notes') || '[]');
        setNotes(saved);
    }, []);

    const saveNotes = (updatedNotes) => {
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingNote) {
            const updated = notes.map(n => n.id === editingNote.id ? { ...editingNote, updatedAt: new Date().toISOString() } : n);
            saveNotes(updated);
            setEditingNote(null);
        } else {
            const note = { ...newNote, id: Date.now(), createdAt: new Date().toISOString() };
            saveNotes([...notes, note]);
            setNewNote({ title: "", content: "", color: "emerald" });
        }
        setShowForm(false);
    };

    const handleDelete = (id) => {
        if (confirm("Delete this note?")) {
            saveNotes(notes.filter(n => n.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FaStickyNote className="text-emerald-400" />
                    Quick Notes
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all flex items-center gap-2"
                >
                    {showForm ? <MdClose /> : <MdAdd />}
                    {showForm ? 'Cancel' : 'New Note'}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Note title..."
                        value={editingNote?.title || newNote.title}
                        onChange={(e) => editingNote ? setEditingNote({...editingNote, title: e.target.value}) : setNewNote({...newNote, title: e.target.value})}
                        className="w-full bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                    <textarea
                        placeholder="Note content..."
                        value={editingNote?.content || newNote.content}
                        onChange={(e) => editingNote ? setEditingNote({...editingNote, content: e.target.value}) : setNewNote({...newNote, content: e.target.value})}
                        rows="4"
                        className="w-full bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                    <div className="flex gap-2">
                        {colors.map(color => (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => editingNote ? setEditingNote({...editingNote, color: color.name}) : setNewNote({...newNote, color: color.name})}
                                className={`w-8 h-8 rounded-full bg-linear-to-br ${color.class} ${(editingNote?.color || newNote.color) === color.name ? 'ring-2 ring-white' : ''}`}
                            ></button>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all font-semibold"
                    >
                        {editingNote ? 'Update Note' : 'Create Note'}
                    </button>
                </form>
            )}

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => {
                    const colorClass = colors.find(c => c.name === note.color)?.class || colors[0].class;
                    return (
                        <div
                            key={note.id}
                            className={`bg-linear-to-br ${colorClass} backdrop-blur-xl border rounded-2xl p-6 hover:scale-105 transition-transform`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold text-white">{note.title}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setEditingNote(note); setShowForm(true); }}
                                        className="text-emerald-400 hover:text-emerald-300"
                                    >
                                        <MdEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm whitespace-pre-wrap">{note.content}</p>
                            <p className="text-gray-500 text-xs mt-3">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    );
                })}
            </div>

            {notes.length === 0 && !showForm && (
                <div className="text-center py-12 text-gray-500">
                    No notes yet. Create your first note!
                </div>
            )}
        </div>
    );
}
