'use client'

import React, { useState, useEffect } from 'react';

import styles from '@/components/TaskDisplayBox.module.css'
import Task from './Task'
import TaskForm from './TaskForm'
import UpdateTaskForm from './UpdateTaskform'

export default function TaskDisplayBox({ activeTab, setActiveTab }) {

    const [tasksList, setTasksList] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);

    //recuperation de la liste des taches
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/getTasks');
            if (response.ok) {
                const result = await response.json();
                setTasksList(result.tasks);
            } else {
                console.error('Error fetching tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    //Convertion des date/heures pour l'affichage
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const handleSubmit = (taskData) => {
        // Logique pour soumettre les données de la tâche
        console.log("Données de la tâche soumises :", taskData);
    };

    const handleDeleteTask = (index) => {
        // Supprimer la tâche de la liste des tâches
        const updatedTasks = [...tasksList];
        updatedTasks.splice(index, 1);
        setTasksList(updatedTasks);
    };

    const handleEditTask = (index) => {
        const taskToEdit = tasksList[index];
        setTaskToEdit(taskToEdit); 
        setEditingTaskIndex(index);
        setActiveTab('updateTaskForm');
    };


    return (
        <section className={styles.section}>
            <div className={styles.warpper}>  
                {activeTab === 'allTask' ? (
                    <>
                        <div className={styles.header}>
                            <span className={styles.titre}>All Tasks</span>
                            <span className={styles.addTaskButton} onClick={() => setActiveTab('taskForm')}>+</span>
                        </div>
                        <div className={styles.taskDisplaySection}>
                            <div className={styles.taskGrid}>
                                {tasksList.map((task, index) => (
                                    <Task
                                    key={task.id}
                                    id={task.id}
                                    index={index}
                                    taskTitle={task.title}
                                    taskDescription={task.description}
                                    taskDate={formatDate(task.date)}
                                    important={task.important}
                                    taskStatus={task.completed ? 'completed' : 'incompleted'} 
                                    onDelete={handleDeleteTask} 
                                    onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
                                    editingTaskIndex={editingTaskIndex}
                                />
                                ))}
                                <div className={styles.addButton} onClick={() => setActiveTab('taskForm')}>
                                    <span className={styles.plus} > + </span> <span> Add New Task</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) 
                :activeTab === 'completedTask' ? (
                    <>
                        <div className={styles.header}>
                            <span className={styles.titre}>Completed Tasks</span>
                            <span className={styles.addTaskButton} onClick={() => setActiveTab('taskForm')}>+</span>
                        </div>
                        <div className={styles.taskDisplaySection}>
                            <div className={styles.taskGrid}>
                                {tasksList
                                    .filter(task => task.completed) 
                                    .map((task, index) => (
                                        <Task
                                            key={task.id}
                                            id={task.id}
                                            taskTitle={task.title}
                                            taskDescription={task.description}
                                            taskDate={formatDate(task.date)}
                                            important={task.important}
                                            taskStatus={'completed'}
                                            onDelete={handleDeleteTask} 
                                            onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
                                            editingTaskIndex={editingTaskIndex}
                                        />
                                ))}
                                <div className={styles.addButton} onClick={() => setActiveTab('taskForm')}>
                                    <span className={styles.plus} > + </span> <span> Add New Task</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) 
                :activeTab === 'importantTask' ? (
                    <>
                        <div className={styles.header}>
                            <span className={styles.titre}>Importants Tasks</span>
                            <span className={styles.addTaskButton} onClick={() => setActiveTab('taskForm')}>+</span>
                        </div>
                        <div className={styles.taskDisplaySection}>
                            <div className={styles.taskGrid}>
                                {tasksList
                                    .filter(task => task.important) 
                                    .map((task, index) => (
                                        <Task
                                            key={task.id}
                                            id={task.id}
                                            taskTitle={task.title}
                                            taskDescription={task.description}
                                            taskDate={formatDate(task.date)}
                                            important={task.important}
                                            taskStatus={task.completed ? 'completed' : 'incompleted'}
                                            onDelete={handleDeleteTask} 
                                            onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
                                            editingTaskIndex={editingTaskIndex}
                                        />
                                ))}
                                <div className={styles.addButton} onClick={() => setActiveTab('taskForm')}>
                                    <span className={styles.plus} > + </span> <span> Add New Task</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) 
                :activeTab === 'incompletedTask' ? (
                    <>
                        <div className={styles.header}>
                            <span className={styles.titre}>Incompleted Task</span>
                            <span className={styles.addTaskButton} onClick={() => setActiveTab('taskForm')}>+</span>
                        </div>
                        <div className={styles.taskDisplaySection}>
                            <div className={styles.taskGrid}>
                                {tasksList
                                    .filter(task => !task.completed) 
                                    .map((task, index) => (
                                        <Task
                                            key={task.id}
                                            id={task.id}
                                            taskTitle={task.title}
                                            taskDescription={task.description}
                                            taskDate={formatDate(task.date)}
                                            important={task.important}
                                            taskStatus={'incompleted'}
                                            onDelete={handleDeleteTask} 
                                            onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
                                            editingTaskIndex={editingTaskIndex}
                                        />
                                ))}
                                <div className={styles.addButton} onClick={() => setActiveTab('taskForm')}>
                                    <span className={styles.plus} > + </span> <span> Add New Task</span>
                                </div>
                            </div>
                        </div>
                    </>
                )
                : activeTab === 'taskForm' ? (
                    <div className={styles.formContainer}>
                        <TaskForm 
                        setActiveTab={setActiveTab} 
                        onSubmitForm={handleSubmit} 
                        />
                    </div>
                )
                : activeTab === 'updateTaskForm' ? (
                    <div className={styles.formContainer}>
                        <UpdateTaskForm 
                        setActiveTab={setActiveTab} 
                        onSubmitForm={handleSubmit} 
                        taskToEdit={taskToEdit} 
                        tasksList={tasksList} 
                        editingTaskIndex={editingTaskIndex}
                        setTasksList={setTasksList}
                        />
                    </div>
                )
                : (
                    <div>404 - Not Found</div>
                )}
            </div>
        </section>
    );}    