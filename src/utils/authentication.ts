import { DBField, User} from '../types';
import { readDB } from '../db/dbController';

const getUser = (): User[] => readDB(DBField.USERS);


const authentication = (userId: string, userPassword: string, cardId: string): boolean => {
    const { id, password } = getUser().filter((data) => data.key === parseInt(cardId))[0];
    
    if (id === userId && password === userPassword) {
        return true;
    } else {
        return false;
    }
};

module.exports = { authentication };
