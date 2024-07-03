declare module 'redux-persist/lib/storage'{
    import {WebStorage} from 'redux-persist/es/storage';
    const storage: WebStorage;
    export default storage;
}