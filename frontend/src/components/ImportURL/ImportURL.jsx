import Header from '../Header/Header.jsx';
import styles from './ImportURL.module.css';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
function ImportURL(){
    const navigate = useNavigate();
    const [repoURL, setRepoURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handelImport = async () => {
        setIsLoading(true);
        const response = await fetch('http://localhost:8001/upload/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'repoURL': repoURL}),
        });
        if (response.status==200){
            const data = await response.json();
            console.log(data);
            setIsLoading(false);
            navigate('/deploy', { state: data });
        }
        else {
            console.log('error');
        }
        setIsLoading(false);
    };
    const handleInputChange = (event) => {
        setRepoURL(event.target.value);
    };

    return (
        <div>
            <Header />
            <div className={styles.main_container}>
                <h1>Import Github Repo</h1>
                <p className={styles.small_content}>Paste your github repo url in the bellow to import the repo</p>
                <p>use ssl keys method if the repo is private</p>
                <input type="text" name='repoURL' className='border-2 border-black' onChange={handleInputChange}/>
                {isLoading ?
                    <div className='bg-black border-black border-2 text-white'>Importing...</div> :
                    <button className='bg-black border-black border-2 text-white' onClick={handelImport}>Import</button> 
                }
            </div>
        </div>
    );
}

export default ImportURL;