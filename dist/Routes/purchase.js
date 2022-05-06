"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_1 = __importDefault(require("../Controller/purchase"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/premiummembership', auth_1.default.authenticate, purchase_1.default.purchasePreminum);
router.post('/updatetransactionstatus', auth_1.default.authenticate, purchase_1.default.updateTransactionStatus);
exports.default = router;
