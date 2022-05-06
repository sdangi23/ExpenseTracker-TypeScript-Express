"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uploadtoS3 = (data, filename) => {
    let s3bucket = new aws_sdk_1.default.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    });
    var params = {
        Bucket: 'expensetracker23',
        Key: filename,
        Body: data,
        ACL: 'public-read'
    };
    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('Something went wrong', err);
                reject(err);
            }
            else {
                resolve(s3response.Location);
            }
        });
    });
};
exports.default = uploadtoS3;
