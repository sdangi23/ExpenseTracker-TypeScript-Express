import AWS from 'aws-sdk';

const uploadtoS3 = (data: any, filename: any) => {
   
    let s3bucket = new AWS.S3({
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY
    });


        var params = {
            Bucket:'expensetracker23',
            Key:filename,
            Body:data,
            ACL:'public-read'
        }

        return new Promise( (resolve, reject) => {

            s3bucket.upload(params, (err: any, s3response: { Location: unknown; }) => {
                if(err){
                    console.log('Something went wrong',err);
                    reject(err);
                }else{
                    resolve(s3response.Location);
                }
            })

        })
        

}

export default uploadtoS3;