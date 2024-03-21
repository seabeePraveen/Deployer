import { useLocation } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import styles from './Deploy.module.css';

function Deploy() {
    const location = useLocation();
    const data = location.state;
    
    
    return (
        <div>
            <Header />
            <div className={styles.main_container}>
                <input type="text" name='BaseDir' value='./' />

            </div>
        </div>
    );
}

export default Deploy;