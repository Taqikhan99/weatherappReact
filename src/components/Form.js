import React from 'react';
import styles from './Weather.module.css'
const Form = (props) => {
    return (
        <div>
                <form onSubmit={props.loadweather}>
                 {/* search section */}
                <div className={styles.searchsection}>
                <input onChange={props.change} type="search" name="citySearch" className={styles.searchBox1} />
                <button  className={styles.btn}>Search</button>
                    
                    </div>   
                
                
                </form>
                
        </div>
    );
};

export default Form;