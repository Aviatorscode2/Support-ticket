import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

 export default function useAuthStatus() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const {user} = useSelector(state => state.auth);
    
    useEffect(() => {
        if (user) {
        setIsAuthenticated(true);
        } else {
        setIsAuthenticated(false);
        }
        setCheckingStatus(false);
    }, [user]);
    
    return {isAuthenticated, checkingStatus};
}