//File upload
import { PutBucketCorsCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

/************************** Commented out bacause I cant afford aws services
 *     AWS File Upload    *
 **************************/
/* const accessKeyId = process.env.AWS_ACCESS_KEY || "AKIATX75YK2NY7GB3AMA";
const secretAccessKey =
  process.env.AWS_SECRET_KEY || "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";

const s3Config = {
  credentials: { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey },
  region: "us-east-2",
};

const s3Client = new S3Client(s3Config); */

/* const upload = multer({
  // https://github.com/expressjs/multer
  dest: "./public/uploads/",
  //limits: { fileSize: 100000 },
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, "-").toLowerCase();
  },
  onFileUploadData: async function (file, data, req, res) {
    console.log("about to")
    // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
    var params = {
      Bucket: "telly-file-storage",
      Key: file.name,
      Body: data,
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log("Done");
      res.send(data);
    } catch (err) {
      console.log("Error uploading data: ", err);
    }
  },
}); */

/* const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "telly-file-storage",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      var filename = Date.now().toString() + `-${file.originalname}`;
      cb(null, filename);
    },
  }),
}); */

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      const isvalid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
  
      if (isvalid) {
        error = null;
      }
      callBack(error, "src/images");
    },
    filename: (req, file, callBack) => {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      callBack(null, name + "-" + Date.now() + "." + ext);
    },
  });

  const upload = multer({storage: storage}).array("images[]");

export default upload;
