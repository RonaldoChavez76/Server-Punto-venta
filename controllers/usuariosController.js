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
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    createUs(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO usuarios set ?', [req.body]);
            resp.json({ message: 'User Saved' });
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
            resp.json({ message: 'The user was updated' });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM usuarios WHERE id =?', [id]);
            resp.json({ message: 'The user was deleted' });
        });
    }
    login(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield database_1.default.query('SELECT u.id, u.nombre, u.email, tu.id AS tipo_usuario FROM usuarios u JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id WHERE u.email = ? AND u.password = ?', [email, password]);
            if (result.length > 0) {
                resp.json(result[0]);
            }
            else {
                resp.status(401).json({ message: 'Invalid email or password' });
            }
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (usuarios.length > 0) {
                return resp.json(usuarios[0]);
            }
            resp.status(404).json({ text: 'The user does`nt exists' });
        });
    }
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios');
            resp.json(usuarios);
        });
    }
    getByTipoUsuario(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios WHERE id_tipo_usuario = ?', [id]);
            if (usuarios.length > 0) {
                resp.json(usuarios);
            }
            else {
                resp.status(404).json({ message: 'No users found for this type' });
            }
        });
    }
}
const usuariosController = new UsuariosController();
exports.default = usuariosController;
