import styles from '@/components/Task.module.css'

import { IoSettingsSharp  } from 'react-icons/io5';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Task({taskTitle, taskDescription,taskDate, taskStatus,  index, onDelete, onEdit, editingTaskIndex, id })
{
    const statusStyle = {
        backgroundColor: taskStatus === 'incompleted' ? 'red' : 'transparent'
    };

    const handleDeleteClick = () => {
        fetch(`/api/deleteTask?id=${id}`, { 
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            toast.error('Tâche supprimée avec succès !');
            onDelete(index);
        })
        .catch((error) => {
            console.error('Erreur lors de la suppression de la tâche:', error);
            toast.error('Erreur lors de la suppression de la tâche');
        });
    };
    const handleEditClick = () => 
    {
        onEdit(index);
    };

    return <div className={styles.task} style={{ display: editingTaskIndex === index ? 'none' : 'block' }}>
        <div className={styles.taskWrapper}>
        <div className={styles.taskTitle}>
            {taskTitle}
        </div>
        <div className={styles.taskDescription}>
            {taskDescription}
        </div>
        <div className={styles.taskDate}>
            {taskDate}
        </div>
        <div className={styles.taskButton}>
            <span className={styles.taskStatus}>
                {taskStatus}
            </span>
            <div className={styles.settingBtn}>
                <IoSettingsSharp onClick={handleEditClick}/>
                <MdDeleteForever onClick={handleDeleteClick}/>
            </div>
            
        </div>
        </div>
    </div>
}