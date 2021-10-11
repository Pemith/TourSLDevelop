const legalDocs=require('../Models/ClientLegalDocuments');


const legalFileUpload=async(req,res,next) =>{
    try {
        const file=new legalDocs({
            client: {
                _id: client._id,
                name: client.companyName
            },
            fileName:req.file.originalname,
            filePath:req.file.path,
            fileType=req.file.mimetype,
            fileSize:fileSizeFormatter(req.file.size,3)
        });

        await file.save();
        res.status(201).send('File Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLegalDocuments= async (req,res,next) =>{
    try {
        const files=new legalDocs.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports={
    legalFileUpload,
    getLegalDocuments
}