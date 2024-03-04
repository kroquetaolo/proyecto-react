import { useEffect, useState } from 'react';
import './DarkMode.css';

// Component for toggling dark mode on or off in the application.
const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.classList.toggle('dark-mode-off', darkMode);
    }, [darkMode]);

    // Function to toggle the dark mode state, by default the darkmode is on.
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="toggle-switch">
            <label className="switch-label">
                <input type="checkbox" className="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default DarkMode;
