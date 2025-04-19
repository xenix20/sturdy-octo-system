import mysql from 'mysql2/promise'


async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: '10.10.2.199',
            user: 'root',
            password: '',
            database:"xenix"
        });
        console.log('Connection to MySQL established.')
        return connection
    } catch (error) {
        console.error('Error connecting to MySQL:', error)
        throw error
    }
}
export { connect }