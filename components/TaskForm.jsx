'use client'

import React, { useState } from 'react';
import styles from '@/components/Taskform.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TaskForm({ onSubmitForm, setActiveTab }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    important: false,
    completed: false
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
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/api/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        toast.success('Tâche créée avec succès !');
        onSubmitForm(formData);
        setActiveTab('allTask');
        setTimeout(() => {
        location.reload();
      }, 2000);
      } catch (error) {
        console.error('Error adding task:', error);
        toast.error('Une erreur est survenue lors de la création de la tâche.');
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
        <h2>Create a Task</h2>
        <span onClick={() => setActiveTab('allTask')}>X</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <span>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <span>{errors.description}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
        {errors.date && <span>{errors.date}</span>}
      </div>

      <div className={`${styles.formGroup} ${styles.check}`}>
        <label htmlFor="important">Toggle Important</label>
        <input type="checkbox" id="important" name="important" checked={formData.important} onChange={handleChange} />
      </div>

      <div className={`${styles.formGroup} ${styles.check}`}>
        <label htmlFor="completed">Toggle Completed</label>
        <input type="checkbox" id="completed" name="completed" checked={formData.completed} onChange={handleChange} />
      </div>
      <div className={styles.button}>
        <button type="submit">Create Task</button>
      </div>
    </form>
  );
}
