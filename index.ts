import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import { Pool, QueryResult } from 'pg';

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

/*app.get('/', (req: Request, res: Response) => {
    res.status(200).json({result: 'Hello success'})
})

app.listen(port)*/

app.get('/', (req: Request, res: Response) => {
    const pool = openDBConnection()
    pool.query('SELECT * FROM task', (err, result) => {
        if(err){
            res.status(500).json({error: err})
        }
        res.status(200).json(result.rows)
        })
    })
    const openDBConnection = (): Pool => {
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'todo',
            password: 'todo',
            port: 5432,
           /*user: 'root',
            host: 'dpg-cgat2402qv267udp53ig-a.oregon-postgres.render.com',
            database: 'todo_eeya',
            password:'ULTWdv0VJGHiwhsXNQkKtrixUjgRvOS9',
            port: 5432,
            ssl : true*/
        })
        return pool
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

    app.post('/new', (req: Request, res: Response) => {
        const pool = openDBConnection()
        pool.query('INSERT INTO task (description) VALUES ($1) returning *',
         [req.body.description], 
         (error: Error, result:QueryResult) => {
            if(error){
                res.status(500).json({error: error.message})
            }
            res.status(200).json({id: result.rows[0].id})
        })
    });
    app.delete('/delete/:id', async(req: Request, res: Response)=>{
        const pool = openDBConnection()
        const id = parseInt(req.params.id)
        pool.query('delete from task where id = $1', [id],
        (error: Error, result: QueryResult) => {
            if(error){
                res.status(500).json({error: error.message})
            }
            res.status(200).json({id: id})
        })
    })
