import styles from '@/components/NavBar.module.css'

export default function NavBar({ activeTab, setActiveTab })
{
    return <section className= {styles.section}>
        <div className={styles.container + ' ' + styles.profil}>
            <div className={styles.profilPicture}>

            </div>
            <div className={styles.profilName}>
                <span>Franck</span>
                <span>Kouagnang</span>
            </div>
        </div>
        <div className={styles.container + ' ' + styles.navLinks}>
        <div className={activeTab === 'allTask' ? styles.active : ''} onClick={() => setActiveTab('allTask')}>
                All Tasks
            </div>
            <div className={activeTab === 'importantTask' ? styles.active : ''} onClick={() => setActiveTab('importantTask')}>
                Important
            </div>
            <div className={activeTab === 'completedTask' ? styles.active : ''} onClick={() => setActiveTab('completedTask')}>
                Completed
            </div>
            <div className={activeTab === 'incompletedTask' ? styles.active : ''} onClick={() => setActiveTab('incompletedTask')}>
                Incompleted
            </div>
        </div>
        <div className={styles.container }>
            <div className={styles.signOutButton}>Sign Out</div>
        </div>
    </section>
}