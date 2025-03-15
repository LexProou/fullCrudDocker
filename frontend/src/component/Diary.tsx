import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Delete from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';



axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

interface DiaryEntry {
  id: number;
  content: string;
  completed: boolean;
}

const DiaryEntries: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<string>('');
  const [editEntry, setEditEntry] = useState<DiaryEntry | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('/api/diary/entries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const addEntry = async () => {
    try {
      const response = await axios.post('/api/diary/entry', { content: newEntry, completed: false });
      setEntries([...entries, response.data]);
      setNewEntry('');
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const openEditDialog = (entry: DiaryEntry) => {
    setEditEntry(entry);
    setEditContent(entry.content);
  };

  const closeEditDialog = () => {
    setEditEntry(null);
    setEditContent('');
  };

  const updateEntry = async () => {
    if (editEntry) {
      try {
        const response = await axios.put(`/api/diary/entry/${editEntry.id}`, { content: editContent });
        setEntries(entries.map(entry => (entry.id === editEntry.id ? response.data : entry)));
        closeEditDialog();
      } catch (error) {
        console.error('Error updating entry:', error);
      }
    }
  };

  const markAsCompleted = async (id: number) => {
    try {
      const response = await axios.put(`/api/diary/entry/${id}/complete`);
      setEntries(entries.map(entry => (entry.id === id ? response.data : entry)));
    } catch (error) {
      console.error('Error marking entry as completed:', error);
    }
  };

  const deleteEntry = async (id: number) => {
    try {
      await axios.delete(`/api/diary/entry/${id}`);
      setEntries(entries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Diary Entries</Typography>
      <TextField
        label="New entry"
        variant="outlined"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addEntry} fullWidth>
        Add Entry
      </Button>
      <List>
        {entries.map(entry => (
          <ListItem key={entry.id} style={{ backgroundColor: entry.completed ? '#e0f7fa' : 'inherit' }}>
            <ListItemText primary={entry.content} />
            <Box display="flex" justifyContent="flex-end">
              <IconButton edge="end" onClick={() => markAsCompleted(entry.id)} color="primary">
                <CheckCircle />
              </IconButton>
              <IconButton edge="end" onClick={() => openEditDialog(entry)} color="primary">
                <SystemSecurityUpdateGoodIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteEntry(entry.id)} color="secondary">
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <Dialog open={!!editEntry} onClose={closeEditDialog}>
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Entry Content"
            type="text"
            fullWidth
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={updateEntry} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiaryEntries;
