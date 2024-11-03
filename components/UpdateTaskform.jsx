// components/UpdateTaskForm.jsx

import React, { useState } from 'react';
import styles from '@/components/Taskform.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateTaskForm({ onSubmitForm, setActiveTab, taskToEdit }) {
  const [formData, setFormData] = useState({
    id: taskToEdit ? taskToEdit.id : null,
    title: taskToEdit ? taskToEdit.title : '',
    description: taskToEdit ? taskToEdit.description : '',
    date: taskToEdit ? taskToEdit.date : '',
    important: taskToEdit ? taskToEdit.important : false,
    completed: taskToEdit ? taskToEdit.completed : false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello world");
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/api/updateTask', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            important: formData.important ? 1 : 0,
            completed: formData.completed ? 1 : 0,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        toast.success('Tâche mise à jour avec succès !');
        onSubmitForm(); 
        setActiveTab('allTask');
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (error) {
        console.error('Error updating task:', error);
        toast.error('Une erreur est survenue lors de la mise à jour de la tâche.');
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } else {
      setErrors(validationErrors);
    }
  };


  const validateForm = (data) => {
    const errors = {};
    const currentDate = new Date().toISOString().split('T')[0];

    if (data.date < currentDate) {
      errors.date = "La date ne peut pas être inférieure à aujourd'hui";
    }

    if (data.description.length < 10) {
      errors.description = 'La description doit avoir au moins 10 caractères';
    }

    if (data.title.length < 5) {
      errors.title = 'Le titre doit avoir au moins 5 caractères';
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.AddForm}>
      <div className={styles.formHeader}>
        <h2>Modifier une tâche</h2>
        <span onClick={() => setActiveTab('allTask')}>X</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="title">Titre :</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <span>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description :</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <span>{errors.description}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Date :</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
        {errors.date && <span>{errors.date}</span>}
      </div>

      <div className={`${styles.formGroup} ${styles.check}`}>
        <label htmlFor="important">Important :</label>
        <input type="checkbox" id="important" name="important" checked={formData.important} onChange={handleChange} />
      </div>

      <div className={`${styles.formGroup} ${styles.check}`}>
        <label htmlFor="completed">Terminé :</label>
        <input type="checkbox" id="completed" name="completed" checked={formData.completed} onChange={handleChange} />
      </div>
      <div className={styles.button}>
        <button type="submit">Modifier la tâche</button>
      </div>
    </form>
  );
}
