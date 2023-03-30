"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = 3001;
/*app.get('/', (req: Request, res: Response) => {
    res.status(200).json({result: 'Hello success'})
})

app.listen(port)*/
app.get('/', (req, res) => {
    const pool = openDBConnection();
    pool.query('SELECT * FROM task', (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        res.status(200).json(result.rows);
    });
});
const openDBConnection = () => {
    const pool = new pg_1.Pool({
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
    });
    return pool;
};
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
app.post('/new', (req, res) => {
    const pool = openDBConnection();
    pool.query('INSERT INTO task (description) VALUES ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
app.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = openDBConnection();
    const id = parseInt(req.params.id);
    pool.query('delete from task where id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: id });
    });
}));
